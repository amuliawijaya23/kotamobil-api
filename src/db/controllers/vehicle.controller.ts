import { Request, Response } from 'express';

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { bucketName } from '~/lib/S3';
import S3 from '~/lib/S3';

import { randomChar } from '~/lib/helpers';
import sharp from 'sharp';

import {
  getVehicles,
  getUserVehicles,
  queryVehicles,
  createVehicle,
  deleteVehicleById,
  updateVehicleById,
} from '~/db/actions/vehicle.action';

export const getAllVehicles = async (request: Request, response: Response) => {
  try {
    const vehicles = await getVehicles();

    return response.status(200).json(vehicles).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const getMyVehicles = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const vehicles = await getUserVehicles(user._id);

    const inventory = JSON.parse(JSON.stringify(vehicles));

    for (const [index, vehicle] of vehicles.entries()) {
      if (vehicle.images?.length > 0) {
        const images = await Promise.all(
          vehicle.images.map(async (image: string) => {
            const getImageParam = { Bucket: bucketName, Key: image };
            const command = new GetObjectCommand(getImageParam);
            const imageUrl = await getSignedUrl(S3, command, {
              expiresIn: 24 * 60 * 60,
            });
            return { key: image, url: imageUrl };
          }),
        );
        inventory[index].images = images;
      }
    }

    return response.status(200).json(inventory).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const addVehicle = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const formData = { ...JSON.parse(request.body.data), ownerId: user._id };

    if (
      !formData.name ||
      !formData.vin ||
      !formData.make ||
      !formData.model ||
      !formData.year ||
      !formData.odometer ||
      !formData.color ||
      !formData.condition ||
      !formData.assembly ||
      !formData.transmission ||
      !formData.fuelType ||
      !formData.price ||
      !formData.dateAdded ||
      !('sold' in formData)
    ) {
      return response.status(400).json({ message: 'Missing parameter' }).end();
    }

    if (request.files) {
      const vehicleImages = [];
      const images = request.files as Express.Multer.File[];
      for (const image of images) {
        const imageName = randomChar(16);

        const buffer = await sharp(image.buffer)
          .resize({ height: 1080, width: 1350, fit: 'contain' })
          .toBuffer();
        const params = {
          Bucket: bucketName,
          Key: `${request.user?._id}/images/vehicles/${imageName}`,
          Body: buffer,
          ContentType: image.mimetype,
        };

        const command = new PutObjectCommand(params);
        await S3.send(command);
        vehicleImages.push(`${user._id}/images/vehicles/${imageName}`);
      }
      formData.images = vehicleImages;
    }

    const vehicle = await createVehicle(formData);
    const vehicleData = { ...vehicle };

    if (vehicle.images?.length > 0) {
      const images = await Promise.all(
        vehicle.images.map(async (image: string) => {
          const getImageParam = {
            Bucket: bucketName,
            Key: image,
          };
          const command = new GetObjectCommand(getImageParam);
          const imageUrl = await getSignedUrl(S3, command, {
            expiresIn: 24 * 60 * 60,
          });
          return { key: image, url: imageUrl };
        }),
      );
      vehicleData.images = images;
    }

    return response.status(200).json(vehicleData).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const deleteVehicle = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const deletedVehicle = await deleteVehicleById(id);

    return response.status(200).json(deletedVehicle).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const updateVehicle = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const formData = { ...JSON.parse(request.body.data) };

    if (
      ('name' in formData && !formData.name) ||
      ('vin' in formData && !formData.vin) ||
      ('make' in formData && !formData.make) ||
      ('model' in formData && !formData.model) ||
      ('year' in formData && !formData.year) ||
      ('odometer' in formData && !formData.odometer) ||
      ('color' in formData && !formData.color) ||
      ('condition' in formData && !formData.condition) ||
      ('assembly' in formData && !formData.assembly) ||
      ('transmission' in formData && !formData.transmission) ||
      ('fuelType' in formData && !formData.fuelType) ||
      ('price' in formData && !formData.price) ||
      ('dateAdded' in formData && !formData.dateAdded)
    ) {
      return response.status(400).json({ message: 'Missing parameter' }).end();
    }
    const { images, ...data } = formData;

    const updateParams: Record<string, any> = {
      $set: data,
    };

    if (formData.images) {
      const keys = formData.images.map(
        (img: { key: string; url: string }) => img.key,
      );
      updateParams['$pullAll'] = {
        images: keys,
      };
      for (const image of formData.images) {
        const params = {
          Bucket: bucketName,
          Key: image.key,
        };
        const command = new DeleteObjectCommand(params);
        await S3.send(command);
      }
    }

    const vehicleImages = [];

    if (request.files) {
      const images = request.files as Express.Multer.File[];

      for (const image of images) {
        const imageName = randomChar(16);
        const buffer = await sharp(image.buffer)
          .resize({ height: 1080, width: 1350, fit: 'contain' })
          .toBuffer();
        const params = {
          Bucket: bucketName,
          Key: `${request.user?._id}/images/vehicles/${imageName}`,
          Body: buffer,
          ContentType: image.mimetype,
        };

        const command = new PutObjectCommand(params);
        await S3.send(command);
        vehicleImages.push(`${request.user?._id}/images/vehicles/${imageName}`);
      }
    }

    if (vehicleImages.length > 0) {
      updateParams['$push'] = { images: vehicleImages };
    }

    const updatedVehicle = await updateVehicleById(id, updateParams);

    const vehicleData = { ...updatedVehicle };

    if (vehicleData.images.length > 0) {
      const images = await Promise.all(
        vehicleData.images.map(async (image: string) => {
          const getImageParam = {
            Bucket: bucketName,
            Key: image,
          };
          const command = new GetObjectCommand(getImageParam);
          const imageUrl = await getSignedUrl(S3, command, {
            expiresIn: 24 * 60 * 60,
          });
          return { key: image, url: imageUrl };
        }),
      );
      vehicleData.images = images;
    }
    return response.status(200).json(vehicleData).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const searchListings = async (request: Request, response: Response) => {
  const data = request.body;

  const params = {
    $and: [],
  };
};
