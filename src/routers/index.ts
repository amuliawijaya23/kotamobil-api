import { Router } from 'express';

import userRoutes from './userRoutes';
import listingRoutes from './listingRoutes';

const router = Router();

export default (): Router => {
  userRoutes(router);
  listingRoutes(router);
  return router;
};
