import { Router } from 'express';

import authenticationRoutes from './authenticationRoutes';

const router = Router();

export default (): Router => {
  authenticationRoutes(router);
  return router;
};
