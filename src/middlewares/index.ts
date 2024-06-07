import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import * as vehicleActions from '~/db/actions/vehicle.action';
import { VehicleInterface } from '~/db/models/vehicle.model';
import { UserInterface } from '~/db/models/user.model';
import { getContactById } from '~/db/actions/contact.action';
dotenv.config();

const COOKIE_NAME = process.env.COOKIE_NAME || 'SESSION';

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

const storage = multer.memoryStorage();
export const multerUpload = multer({ storage: storage });

export const validateLogin = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    if (!request.isAuthenticated()) {
      if (request.cookies) {
        response.clearCookie(COOKIE_NAME);
      }
      return response.status(401).json({ message: 'Unauthorized' }).end();
    }
    return next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const isNotAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    if (request.isAuthenticated()) {
      return response.status(403).json({ message: 'Forbidden' }).end();
    }
    return next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const validateFormData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const formData = { ...JSON.parse(request.body.data) };

    for (const field of requiredFields) {
      if (!formData[field]) {
        return response
          .status(400)
          .json({ message: `Missing parameter: ${field}` })
          .end();
      }
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const validateSearchParams = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const {
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

    if (
      !Array.isArray(status) ||
      !Array.isArray(makes) ||
      !Array.isArray(models) ||
      !Array.isArray(condition) ||
      !Array.isArray(assembly) ||
      !Array.isArray(bodyType) ||
      !Array.isArray(fuelType) ||
      !Array.isArray(transmission)
    ) {
      return response
        .status(400)
        .json({ message: 'Invalid filter parameters' })
        .end();
    }

    if (
      !Array.isArray(priceRange) ||
      priceRange.length !== 2 ||
      !Array.isArray(yearRange) ||
      yearRange.length !== 2 ||
      !Array.isArray(odometerRange) ||
      odometerRange.length !== 2
    ) {
      return response
        .status(400)
        .json({ message: 'Invalid range parameters' })
        .end();
    }

    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const isVehicleOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const user = request.user as UserInterface | undefined;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const vehicle = await vehicleActions.findVehicleById(id);

    if (!vehicle) {
      return response.status(404).json({ message: 'Vehicle not found' }).end();
    }

    if (vehicle.ownerId !== user?._id) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Internal Server Error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const isContactOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const user = request.user as UserInterface | undefined;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const contact = await getContactById(id);

    if (!contact) {
      return response
        .status(400)
        .json({ message: 'No vehicle with that id' })
        .end();
    }

    if (contact.ownerId !== user?._id.toString()) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};
