import { Router } from 'express';
import {
  addVehicle,
  getMyVehicles,
  getVehicleImages,
  updateVehicle,
  deleteVehicle,
} from '~/db/controllers/vehicle.controller';
import { isAuthenticated, isVehicleOwner, multerUpload } from '~/middlewares';

export default (router: Router) => {
  router.post(
    '/api/vehicle/add',
    multerUpload.array('images', 10),
    isAuthenticated,
    addVehicle,
  );
  router.get('/api/vehicle', isAuthenticated, getMyVehicles);
  router.get(
    '/api/vehicle/images/:id',
    isAuthenticated,
    isVehicleOwner,
    getVehicleImages,
  );
  router.post(
    '/api/vehicle/update/:id',
    multerUpload.array('images', 10),
    isAuthenticated,
    isVehicleOwner,
    updateVehicle,
  );
  router.delete(
    '/api/vehicle/delete/:id',
    isAuthenticated,
    isVehicleOwner,
    deleteVehicle,
  );
};
