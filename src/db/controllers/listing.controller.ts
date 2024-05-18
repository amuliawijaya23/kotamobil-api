import { Request, Response } from 'express';

import {
  getListings,
  getUserListings,
  queryListings,
  createListing,
  deleteListingById,
  updateListingById,
} from '@db/actions/listing.action';

export const allListings = async (request: Request, response: Response) => {
  try {
    const listings = await getListings();

    return response.status(200).json(listings).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export const myListings = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const listings = await getUserListings(id);

    return response.status(200).json(listings).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export const newListing = async (request: Request, response: Response) => {
  try {
    const formData = request.body;

    if (
      formData.name ||
      formData.vin ||
      formData.make ||
      formData.model ||
      formData.year ||
      formData.odometer ||
      formData.color ||
      formData.condition ||
      formData.plateNumber ||
      formData.assembly ||
      formData.transmission ||
      formData.fuelType ||
      formData.taxDate ||
      formData.price ||
      formData.dateAdded
    ) {
      response.sendStatus(400);
    }

    const listing = await createListing({
      ...formData,
      sold: false,
    });
    return response.status(200).json(listing).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export const deleteListing = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const deletedListing = await deleteListingById(id);

    return response.status(200).json(deletedListing).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export const updateListing = async (request: Request, response: Response) => {
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
      ('plateNumber' in formData && !formData.plateNumber) ||
      ('assembly' in formData && !formData.assembly) ||
      ('transmission' in formData && !formData.transmission) ||
      ('fuelType' in formData && !formData.fuelType) ||
      ('taxDate' in formData && !formData.taxDate) ||
      ('price' in formData && !formData.price) ||
      ('dateAdded' in formData && !formData.dateAdded)
    ) {
      response.sendStatus(400);
    }

    const updatedListing = await updateListingById(id, formData);

    return response.status(200).json(updatedListing).end();
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export const searchListings = async (request: Request, response: Response) => {
  const data = request.body;

  const params = {
    $and: [],
  };
};
