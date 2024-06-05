import { Request, Response } from 'express';

import {
  getCoverImagePresignedUrls,
  getPresignedUrls,
  uploadImages,
  removeImages,
} from '~/lib/S3';

import {
  getUserVehicles,
  queryVehicles,
  createVehicle,
  deleteVehicleById,
  updateVehicleById,
  getVehicleById,
} from '~/db/actions/vehicle.action';

const requiredFields = [
  'name',
  'vin',
  'bodyType',
  'make',
  'model',
  'year',
  'odometer',
  'color',
  'condition',
  'assembly',
  'transmission',
  'fuelType',
  'price',
  'dateAdded',
];

export const getMyVehicles = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const vehicles = await getUserVehicles(user._id);

    if (!vehicles || vehicles.length === 0) {
      return response
        .status(404)
        .json({ message: 'No vehicles found for this user' })
        .end();
    }

    const inventory = vehicles.map(async (vehicle) => {
      // deep copy the vehicle object
      const clonedVehicle = JSON.parse(JSON.stringify(vehicle));

      if (clonedVehicle.images && clonedVehicle.images.length > 0) {
        const coverImage = await getCoverImagePresignedUrls(
          clonedVehicle.images[0],
        );
        clonedVehicle.images = [coverImage];
      }
      return clonedVehicle;
    });

    const inventoryWithCoverImages = await Promise.all(inventory);

    return response.status(200).json(inventoryWithCoverImages).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const getVehicleImages = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id } = request.params;

    const vehicle = await getVehicleById(id);

    if (!vehicle) {
      return response.status(404).json({ message: 'Vehicle not found' }).end();
    }

    if (vehicle.images.length === 0) {
      return response
        .status(204)
        .json({ message: 'No images found for this vehicle' })
        .end();
    }

    const images = await getPresignedUrls(vehicle.images);

    return response.status(200).json(images).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const addVehicle = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const formData = { ...JSON.parse(request.body.data), ownerId: user._id };

    for (const field of requiredFields) {
      if (
        !(field in formData) ||
        formData[field] === null ||
        formData[field] === undefined ||
        formData[field] === ''
      ) {
        return response
          .status(400)
          .json({ message: `Missing parameter: ${field}` })
          .end();
      }
    }

    if (request.files) {
      const images = request.files as Express.Multer.File[];
      formData.images = await uploadImages(images, user._id);
    }

    const vehicle = await createVehicle(formData);
    const vehicleData = { ...vehicle };

    if (vehicle.images?.length > 0) {
      vehicleData.images[0] = await getCoverImagePresignedUrls(
        vehicle.images[0],
      );
    }

    return response.status(200).json(vehicleData).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const updateVehicle = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const formData = { ...JSON.parse(request.body.data) };

    for (const field of requiredFields) {
      if (
        !(field in formData) ||
        formData[field] === null ||
        formData[field] === undefined ||
        formData[field] === ''
      ) {
        return response
          .status(400)
          .json({ message: `Missing parameter: ${field}` })
          .end();
      }
    }

    const { images, ...data } = formData;

    const updateParams: Record<string, any> = { $set: { ...data } };

    if (formData.images && Array.isArray(formData.images)) {
      const keys = formData.images.map(
        (img: { key: string; url: string }) => img.key,
      );
      await Promise.all([
        updateVehicleById(id, { $pullAll: { images: keys } }),
        removeImages(keys),
      ]);
    }

    if (request.files && Object.keys(request.files).length > 0) {
      const uploadedImages = await uploadImages(
        request.files as Express.Multer.File[],
        user._id,
      );
      updateParams.$push = { images: uploadedImages };
    }

    const updatedVehicle = await updateVehicleById(id, updateParams);
    const vehicleData = { ...updatedVehicle };

    if (vehicleData.images.length > 0) {
      vehicleData.images = await getPresignedUrls(vehicleData.images);
    }

    return response.status(200).json(vehicleData).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const deleteVehicle = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const deletedVehicle = await deleteVehicleById(id);

    if (deletedVehicle.images && deletedVehicle.images.length > 0) {
      await removeImages(deletedVehicle.images);
    }

    return response.status(200).json(deletedVehicle).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const searchVehicles = async (request: Request, response: Response) => {
  try {
    const user = request.user;
    const {
      search,
      status,
      makes,
      models,
      priceRange,
      yearRange,
      odometerRange,
      condition,
      assembly,
      bodyType,
      fuelType,
      transmission,
    } = request.body;

    if (!user) {
      response.status(401).json({ message: 'Not Authorized' }).end();
      return;
    }

    const query: { [key: string]: any } = { ownerId: user._id.toString() };

    if (search && search.trim()) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (status) {
      const sold = status.map((s: string) => (s === 'Sold' ? true : false));
      query.sold = { $in: sold };
    }

    if (makes) {
      query.make = { $in: makes };
    }

    if (models) {
      query.model = { $in: models };
    }

    if (priceRange.length == 2) {
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    if (yearRange.length == 2) {
      query.year = { $gte: yearRange[0], $lte: yearRange[1] };
    }

    if (odometerRange.length == 2) {
      query.odometer = { $gte: odometerRange[0], $lte: odometerRange[1] };
    }

    if (condition) {
      query.condition = { $in: condition };
    }

    if (assembly) {
      query.assembly = { $in: assembly };
    }

    if (bodyType) {
      query.bodyType = { $in: bodyType };
    }

    if (fuelType) {
      query.fuelType = { $in: fuelType };
    }

    if (transmission) {
      query.transmission = { $in: transmission };
    }

    const vehicles = await queryVehicles(query);

    const inventory = await Promise.all(
      vehicles.map(async (vehicle) => {
        if (vehicle.images && vehicle.images.length > 0) {
          const coverImage = await getCoverImagePresignedUrls(
            vehicle.images[0],
          );
          return { ...vehicle.toObject(), images: [coverImage] };
        }
        return vehicle.toObject();
      }),
    );

    return response.status(200).json(inventory).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const getVehicleSales = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      response.status(401).json({ message: 'Not Authorized' }).end();
      return;
    }

    const { startDate, endDate } = request.body;

    if (!startDate || !endDate) {
      response.status(400).json({ message: 'Missing parameter' }).end();
      return;
    }

    const query: { [key: string]: any } = {
      ownerId: user._id.toString(),
      sold: true,
      dateSold: { $gte: startDate, $lte: endDate },
    };

    const vehicles = await queryVehicles(query);
    const data = vehicles.map((v) => v.toObject());

    return response.status(200).json(data).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};
