import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {
  getUserByEmail,
  createUser,
  getUserById,
  deleteUserById,
} from '~/db/actions/user.action';

export const register = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!email || !firstName || !password) {
      return response
        .status(400)
        .json({ message: 'Missing required parameter' })
        .end();
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      response
        .status(403)
        .json({ message: 'A user with that email already exist' })
        .end();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUser({
      firstName,
      lastName: lastName || '',
      email,
      password: hashedPassword,
    });

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'Missing required parameter' })
        .end();
    }

    const deletedUser = await deleteUserById(id);

    return response.status(200).json(deletedUser.toObject()).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'Missing required Parameter' })
        .end();
    }

    const { firstName, lastName, picture } = request.body;

    if (!firstName || !lastName || !picture) {
      return response
        .status(400)
        .json({ message: 'Missing required Parameter' })
        .end();
    }

    const user = await getUserById(id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (picture) user.picture = picture;

    await user.save();

    return response.status(200).json(user.toObject()).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
