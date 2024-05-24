import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
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

export const isOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};
