import { Request, Response } from 'express';

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
    response.sendStatus(400);
  }
};

export const getMyVehicles = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const vehicles = await getUserVehicles(user._id);

    return response.status(200).json(vehicles).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
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

    const vehicle = await createVehicle({
      ...formData,
      ownerId: request.user?._id,
    });
    return response.status(200).json(vehicle).end();
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

    const formData = request.body;

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

    const updatedVehicle = await updateVehicleById(id, formData);

    if (!updatedVehicle) {
      return response
        .status(400)
        .json({ message: 'No listing with that id' })
        .end();
    }

    return response.status(200).json(updatedVehicle).end();
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
