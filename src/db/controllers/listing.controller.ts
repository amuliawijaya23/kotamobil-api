import { Request, Response } from 'express';

export const findListings = async (request: Request, response: Response) => {
  const data = request.body;

  const params = {
    $and: [],
  };
};
