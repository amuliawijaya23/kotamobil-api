import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;

export const login = [
  passport.authenticate('local', {
    successReturnToOrRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login`,
    failureFlash: true,
  }),
  (request: Request, response: Response) => {
    response.json({
      isAuthenticated: request.isAuthenticated(),
      user: request.user,
    });
  },
];

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  await request.logout((error: Error) => {
    if (error) {
      return next(error);
    }
    return next();
  });
};
