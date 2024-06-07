import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

dotenv.config();

export const login = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Invalid Credentials' }).end();
  }

  passport.authenticate(
    'local',
    { session: true },
    (error: Error, user: Express.User) => {
      if (error) {
        return response.status(400).json({ message: error }).end();
      }

      request.login(user, async () => {
        return response.status(200).json({ isAuthenticated: true, user }).end();
      });
    },
  )(request, response, next);
};

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  await request.logout((error: Error) => {
    if (error) {
      return next(error);
    }
    return response.status(200).end();
  });
};
