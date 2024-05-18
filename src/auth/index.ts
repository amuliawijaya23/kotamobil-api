import { Request, Response, Next } from 'express';
import {
  getUserByEmail,
  createUser,
  getUserById,
  deleteUserById,
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
    return response.sendStatus(500);
  }
};

export const logout = async (
  request: Request,
  response: Response,
  next: Next,
) => {
  await request.logout((error: Error) => {
    if (error) {
      return next(error);
    }
    return next();
  });
};
