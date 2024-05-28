import { Router } from 'express';

import userRoutes from './userRoutes';
import vehicleRoutes from './vehicleRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

export default (): Router => {
  userRoutes(router);
  vehicleRoutes(router);
  contactRoutes(router);
  return router;
};
