import { Router } from 'express';

import {
  addVehicle,
  getMyVehicles,
  updateVehicle,
  deleteVehicle,
} from '~/db/controllers/vehicle.controller';
import { isAuthenticated } from '~/middlewares';

export default (router: Router) => {
  router.post('/api/vehicle/add', addVehicle);
  router.get('/api/vehicle', isAuthenticated, getMyVehicles);
  router.post('/api/vehicle/update/:id', updateVehicle);
  router.delete('/api/vehicle/delete/:id', deleteVehicle);
};
