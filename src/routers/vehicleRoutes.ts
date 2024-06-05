import { Router } from 'express';
import {
  addVehicle,
  getMyVehicles,
  searchVehicles,
  getVehicleImages,
  updateVehicle,
  deleteVehicle,
  getVehicleSales,
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
  router.post('/api/vehicle/search', isAuthenticated, searchVehicles);
  router.post('/api/vehicle/sales', isAuthenticated, getVehicleSales);
  router.delete(
    '/api/vehicle/delete/:id',
    isAuthenticated,
    isVehicleOwner,
    deleteVehicle,
  );
};
