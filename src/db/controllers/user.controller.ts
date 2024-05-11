import { Request, Response } from 'express';
import { userInfo } from 'os';

import { random, authentication } from '../../lib/authentication';
import {
  getUserByEmail,
  createUser,
  getUserById,
} from '../actions/user.action';

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password',
    );

    if (!user) {
      return response.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return response.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();

    response.cookie(
      'KOTAMOBIL-SESSION-AUTH',
      user.authentication.sessionToken,
      {
        domain: 'localhost',
        path: '/',
      },
    );

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const register = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!email || !firstName || !password) {
      return response.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      response.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      firstName,
      lastName: lastName || '',
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const logout = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.sendStatus(400);
    }

    const currentUser = await getUserById(id).select(
      '+authentication.salt +authentication.password +authentication.sessionToken',
    );

    if (!currentUser) {
      return response.sendStatus(400);
    }

    const user = currentUser;
    delete user.authentication.sessionToken;

    currentUser.authentication = { ...user.authentication };

    await currentUser.save();

    response.clearCookie('KOTAMOBIL-SESSION-AUTH');

    response.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
