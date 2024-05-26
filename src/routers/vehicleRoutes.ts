import { Router } from 'express';
import {
  addVehicle,
  getMyVehicles,
  updateVehicle,
  deleteVehicle,
} from '~/db/controllers/vehicle.controller';
import { isAuthenticated, multerUpload } from '~/middlewares';

export default (router: Router) => {
  router.post('/api/vehicle/add', multerUpload.array('images', 10), addVehicle);
  router.get('/api/vehicle', isAuthenticated, getMyVehicles);
  router.post(
    '/api/vehicle/update/:id',
    multerUpload.array('images', 10),
    updateVehicle,
  );
  router.delete('/api/vehicle/delete/:id', deleteVehicle);
};
