import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import * as userActions from '~/db/actions/user.action';
import * as vehicleActions from '~/db/actions/vehicle.action';
import * as contactActions from '~/db/actions/contact.action';
import { UserInterface } from '~/db/models/user.model';
import { convertToObjectId } from '~/lib/helpers';
import dotenv from 'dotenv';
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

export const isAuthenticatedAndVerified = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const user = request.user as UserInterface | undefined;
  try {
    if (!request.isAuthenticated() || !user) {
      if (request.cookies.COOKIE_NAME) {
        response.clearCookie(COOKIE_NAME);
      }
      return response.status(401).json({ message: 'Unauthorized' }).end();
    }

    if (!user || !user.isVerified) {
      return response
        .status(403)
        .json({ message: 'Please verify your email to proceed' })
        .end();
    }

    next();
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

export const validateVehicleFormData = (
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

export const validateContactFormData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const data = { ...request.body };

    if (!data.firstName || !data.mobile) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }
    next();
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

export const validateDeleteContactRequest = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user = request.user as UserInterface | undefined;
    const { contactIds } = request.body;

    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      console.log('Not Array!');
      return response
        .status(400)
        .json({ message: 'Invalid ids provided' })
        .end();
    }

    const contactsToDelete = await contactActions.findContacts({
      _id: { $in: contactIds },
      ownerId: user?._id,
    });

    if (contactsToDelete.length !== contactIds.length) {
      return response
        .status(404)
        .json({ message: 'Some contacts not found or not authorized' })
        .end();
    }

    const objectIds = contactIds.map(convertToObjectId);

    const associatedVehicles = await vehicleActions.findVehicles({
      buyerId: { $in: objectIds },
    });

    if (associatedVehicles.length > 0) {
      const associatedBuyerIds = associatedVehicles.map(
        (vehicle) => vehicle.buyerId,
      );
      const uniqueBuyers = [...new Set(associatedBuyerIds)];
      const associatedVehicleIds = associatedVehicles.map(
        (vehicle) => vehicle._id,
      );

      return response.status(400).json({
        message:
          'Cannot delete contacts. They are associated with vehicles in the inventory. Please update the vehicle buyer information before deleting',
        associatedBuyerIds: uniqueBuyers,
        associatedVehicleIds,
      });
    }

    next();
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

    const contact = await contactActions.findContactById(id);

    if (!contact) {
      return response.status(404).json({ message: 'Contact not found' }).end();
    }

    if (contact.ownerId !== user?._id) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};
