import { Request, Response } from 'express';

import { random, authentication } from '../../lib/authentication';
import { getUserByEmail, createUser } from '../actions/user.action';

export const register = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!email || !firstName || !password) {
      console.log('MISSING DATA');
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
