import { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/actions/user.action';

export const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = request.cookies['KOTAMOBIL-SESSION-AUTH'];

    if (!sessionToken) {
      return response.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return response.sendStatus(403);
    }

    merge(request, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const isOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const currentUserId = get(request, 'identity._id') as string | undefined;

    if (!currentUserId) {
      return response.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return response.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const isUnauthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = request.cookies['KOTAMOBIL-SESSION-AUTH'];

    if (sessionToken) {
      return response.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
