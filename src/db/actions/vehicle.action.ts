import mongoose from 'mongoose';
import Vehicle, { VehicleInterface } from '~/db/models/vehicle.model';
import { convertToObjectId } from '~/lib/helpers';

export const createVehicle = async (
  vehicleData: Partial<VehicleInterface>,
): Promise<VehicleInterface> => {
  try {
    if (typeof vehicleData.ownerId === 'string') {
      vehicleData.ownerId = convertToObjectId(vehicleData.ownerId);
    }

    if (vehicleData.buyerId && typeof vehicleData.buyerId === 'string') {
      vehicleData.buyerId = convertToObjectId(vehicleData.buyerId);
    }

    const vehicle = new Vehicle(vehicleData);
    return (await vehicle.save()).toJSON() as VehicleInterface;
  } catch (error) {
    throw new Error(`Error creating vehicle: ${error}`);
  }
};

export const findVehicleById = async (
  id: string,
): Promise<VehicleInterface | null> => {
  try {
    const vehicle = await Vehicle.findById(id).exec();
    return vehicle ? (vehicle.toJSON() as VehicleInterface) : null;
  } catch (error) {
    throw new Error(`Error finding vehicle by id: ${error}`);
  }
};

export const updateVehicle = async (
  id: string,
  updateData: Record<string, any>,
): Promise<VehicleInterface | null> => {
  try {
    if (typeof updateData.ownerId === 'string') {
      updateData.ownerId = convertToObjectId(updateData.ownerId);
    }

    if (updateData.buyerId && typeof updateData.buyerId === 'string') {
      updateData.buyerId = convertToObjectId(updateData.buyerId);
    }

    const vehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
      returnOriginal: false,
      returnDocument: 'after',
    }).exec();
    return vehicle ? (vehicle.toJSON() as VehicleInterface) : null;
  } catch (error) {
    throw new Error(`Error updating vehicle: ${error}`);
  }
};

export const deleteVehicle = async (
  id: string,
): Promise<VehicleInterface | null> => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(id).exec();
    return vehicle ? (vehicle.toJSON() as VehicleInterface) : null;
  } catch (error) {
    throw new Error(`Error deleting vehicle: ${error}`);
  }
};

export const findVehicles = async (
  query: Record<string, any>,
): Promise<VehicleInterface[]> => {
  try {
    if (typeof query.ownerId === 'string') {
      query.ownerId = convertToObjectId(query.ownerId);
    }

    if (query.buyerId && typeof query.buyerId === 'string') {
      query.buyerId = convertToObjectId(query.buyerId);
    }

    const vehicles = await Vehicle.find(query).sort({ updatedAt: -1 }).exec();
    return vehicles.length > 0
      ? (vehicles.map((vehicle) => vehicle.toJSON()) as VehicleInterface[])
      : vehicles;
  } catch (error) {
    throw new Error(`Error finding vehicles: ${error}`);
  }
};
