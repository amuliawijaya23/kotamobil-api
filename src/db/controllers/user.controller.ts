import { NextFunction, Request, Response } from 'express';
import * as UserActions from '~/db/actions/user.action';
import { UserInterface } from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();

const COOKIE_NAME = process.env.COOKIE_NAME || 'SESSION';

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { email, password, firstName, lastName } = request.body;

    if (!email || !password || !firstName) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const existingUser = await UserActions.findUserByEmail(email);

    if (existingUser) {
      return response.status(400).json({ message: 'User already exist' }).end();
    }

    const user = await UserActions.createUser({
      email,
      password,
      firstName,
      lastName,
    });

    return response.status(201).json(user).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const getUserProfile = async (request: Request, response: Response) => {
  const userId = (request.user as UserInterface)._id;

  if (!userId) {
    return response.status(401).json({ message: 'Not authorized' }).end();
  }

  const user = await UserActions.findUserById(userId);

  if (!user) {
    return response.status(404).json({ message: 'User not found' }).end();
  }

  return response.status(200).json({ isAuthenticated: true, user }).end();
};

export const logoutUser = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.clearCookie(COOKIE_NAME);
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    request.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      return response
        .status(200)
        .json({ message: 'Logged out successfully' })
        .end();
    });
  });
};

export const updateUserProfile = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = (request.user as UserInterface)?._id;
    const { firstName, lastName, picture } = request.body;

    if (!userId) {
      return response.status(401).json({ message: 'Not authorized ' }).end();
    }

    if (!firstName) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const updatedUser = await UserActions.updateUser(userId, request.body);

    if (!updatedUser) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    return response.status(200).json(updatedUser).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const deleteUserProfile = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = (request.user as UserInterface)?._id;

    if (!userId) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const deletedUser = await UserActions.deleteUser(userId);

    if (!deletedUser) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    return response.status(200).json(deletedUser).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occured',
      })
      .end();
  }
};
