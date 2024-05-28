import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { getVehicleById } from '~/db/actions/vehicle.action';
import dotenv from 'dotenv';
import { getContactById } from '~/db/actions/contact.action';
dotenv.config();

const COOKIE_NAME = process.env.COOKIE_NAME || 'SESSION';

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
    console.log(error);
    return response.sendStatus(500);
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
    console.log(error);
    return response.sendStatus(500);
  }
};

export const isVehicleOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const user = request.user;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const vehicle = await getVehicleById(id);

    if (!vehicle) {
      return response
        .status(400)
        .json({ message: 'No vehicle with that id' })
        .end();
    }

    if (vehicle.ownerId !== user?._id) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const isContactOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const user = request.user;

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

    if (contact.ownerId !== user?._id) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

const storage = multer.memoryStorage();
export const multerUpload = multer({ storage: storage });
