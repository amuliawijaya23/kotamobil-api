import { Router } from 'express';

import userRoutes from './userRoutes';

const router = Router();

export default (): Router => {
  userRoutes(router);
  return router;
};
