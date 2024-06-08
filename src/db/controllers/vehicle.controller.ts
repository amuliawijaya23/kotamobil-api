import { Request, Response } from 'express';
import * as vehicleActions from '~/db/actions/vehicle.action';
import {
  getInventoryWithCoverImage,
  getPresignedUrls,
  uploadImages,
  removeImages,
  getCoverImagePresignedUrls,
} from '~/lib/S3';
import { UserInterface } from '../models/user.model';
import { VehicleInterface } from '../models/vehicle.model';

export const createVehicleController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user as UserInterface | undefined;

    const formData = { ...JSON.parse(request.body.data), ownerId: user?._id };

    if (request.files) {
      const images = request.files as Express.Multer.File[];
      formData.images = await uploadImages(images, user?._id.toString());
    }

    const vehicle: VehicleInterface = await vehicleActions.createVehicle(
      formData,
    );

    if (!vehicle.images || vehicle.images.length === 0) {
      return response.status(200).json(vehicle).end();
    }

    const clonedVehicle = JSON.parse(JSON.stringify(vehicle));
    const coverImage = await getCoverImagePresignedUrls(
      clonedVehicle.images[0],
    );
    clonedVehicle.images = [coverImage];
    return response.status(201).json(clonedVehicle).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const updateVehicleController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id } = request.params;
    const user = request.user as UserInterface | undefined;

    const formData = { ...JSON.parse(request.body.data) };

    const { images, ...data } = formData;
    const updateParams: Record<string, any> = { $set: { ...data } };

    if (images && Array.isArray(images)) {
      const keys = images.map((img: { key: string; url: string }) => img.key);
      await Promise.all([
        vehicleActions.updateVehicle(id, { $pullAll: { images: keys } }),
        removeImages(keys),
      ]);
    }

    if (request.files && Object.keys(request.files).length > 0) {
      const uploadedImages = await uploadImages(
        request.files as Express.Multer.File[],
        user?._id.toString(),
      );
      updateParams.$push = { images: uploadedImages };
    }

    const updatedVehicle = await vehicleActions.updateVehicle(id, updateParams);

    const clonedVehicle = JSON.parse(JSON.stringify(updatedVehicle));
    if (clonedVehicle.images.length > 0) {
      clonedVehicle.images = await getPresignedUrls(clonedVehicle.images);
    }

    return response.status(200).json(clonedVehicle).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const deleteVehicleController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id } = request.params;

    const deletedVehicle: VehicleInterface | null =
      await vehicleActions.deleteVehicle(id);

    // remove images from S3 if they exist
    if (deletedVehicle?.images && deletedVehicle.images.length > 0) {
      await removeImages(deletedVehicle.images);
    }

    return response
      .status(200)
      .json({ message: 'Vehicle deleted successfully' })
      .end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const getVehiclesController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user as UserInterface | undefined;

    const vehicles: VehicleInterface[] = await vehicleActions.findVehicles({
      ownerId: user?._id,
    });

    if (vehicles.length === 0) {
      return response.status(200).json(vehicles).end();
    }

    const inventory = await getInventoryWithCoverImage(vehicles);

    return response.status(200).json(inventory).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occured',
      })
      .end();
  }
};

export const searchVehiclesController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user as UserInterface | undefined;

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
      startDate,
      endDate,
    } = request.body;

    const query: { [key: string]: any } = {
      ownerId: user?._id,
      ...(status && { sold: { $in: status.map((s: string) => s === 'Sold') } }),
      ...(!status && { sold: true }),
      ...(makes && { make: { $in: makes } }),
      ...(models && { model: { $in: models } }),
      ...(condition && { condition: { $in: condition } }),
      ...(assembly && { assembly: { $in: assembly } }),
      ...(bodyType && { bodyType: { $in: bodyType } }),
      ...(fuelType && { fuelType: { $in: fuelType } }),
      ...(transmission && { transmission: { $in: transmission } }),
      ...(priceRange && {
        price: { $gte: priceRange[0], $lte: priceRange[1] },
      }),
      ...(yearRange && { year: { $gte: yearRange[0], $lte: yearRange[1] } }),
      ...(odometerRange && {
        odometer: { $gte: odometerRange[0], $lte: odometerRange[1] },
      }),
      ...(startDate &&
        endDate && {
          dateSold: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }),
    };

    if (search && search.trim()) {
      query.name = { $regex: search, $options: 'i' };
    }

    const vehicles: VehicleInterface[] = await vehicleActions.findVehicles(
      query,
    );

    if (vehicles.length === 0 || (startDate && endDate)) {
      return response.status(200).json(vehicles).end();
    }

    const inventory = await getInventoryWithCoverImage(vehicles);

    return response.status(200).json(inventory).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occured',
      })
      .end();
  }
};

export const getVehicleImagesController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id } = request.params;

    const vehicle: VehicleInterface | null =
      await vehicleActions.findVehicleById(id);

    if (!vehicle) {
      return response.status(404).json({ message: 'Vehicle not found' }).end();
    }

    if (!vehicle.images || vehicle.images.length === 0) {
      return response
        .status(204)
        .json({ message: 'No images found for this vehicle' })
        .end();
    }

    const images = await getPresignedUrls(vehicle.images);

    return response.status(200).json(images).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occured',
      })
      .end();
  }
};
