import { Router } from 'express';

import userRoutes from './userRoutes';
import vehicleRoutes from './vehicleRoutes';

const router = Router();

export default (): Router => {
  userRoutes(router);
  vehicleRoutes(router);
  return router;
};
