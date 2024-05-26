import { Request, Response } from 'express';

import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
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

    let inventory = [...vehicles];

    for (const [index, vehicle] of inventory.entries()) {
      if (vehicle.images?.length > 0) {
        const images = await Promise.all(
          vehicle.images.map(async (image: string) => {
            const getImageParam = { Bucket: bucketName, Key: image };
            const command = new GetObjectCommand(getImageParam);
            const imageUrl = await getSignedUrl(S3, command, {
              expiresIn: 24 * 60 * 60,
            });
            return imageUrl;
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
    const formData = request.body;

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

    const data = {
      ...formData,
      ownerId: request.user?._id,
    };

    if (request.files) {
      const vehicleImages = [];
      const images = request.files as Express.Multer.File[];
      for (const image of images) {
        const imageName = randomChar(16);

        const buffer = await sharp(image.buffer)
          .resize({ height: 1080, width: 1080, fit: 'contain' })
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
      data.images = vehicleImages;
    }

    const vehicle = await createVehicle(data);
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
          return imageUrl;
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

    if (!deletedVehicle) {
      return response
        .status(400)
        .json({ message: 'No listing with that id' })
        .end();
    }

    return response.status(200).json(deletedVehicle).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const updateVehicle = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const formData = { ...request.body };

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

    if (request.files) {
      const vehicleImages = [];
      const images = request.files as Express.Multer.File[];

      for (const image of images) {
        const imageName = randomChar(16);
        const buffer = await sharp(image.buffer)
          .resize({ height: 1080, width: 1080, fit: 'contain' })
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
      formData.images = vehicleImages;
    }

    const updatedVehicle = await updateVehicleById(id, formData);

    if (!updatedVehicle) {
      return response
        .status(400)
        .json({ message: 'No listing with that id' })
        .end();
    }

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
          return imageUrl;
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
