import { Router } from 'express';
import {
  createVehicleController,
  getVehiclesController,
  searchVehiclesController,
  getVehicleImagesController,
  updateVehicleController,
  deleteVehicleController,
} from '~/db/controllers/vehicle.controller';
import {
  isAuthenticated,
  validateFormData,
  validateSearchParams,
  isVehicleOwner,
  multerUpload,
} from '~/middlewares';

export default (router: Router) => {
  router.post(
    '/api/vehicle/add',
    multerUpload.array('images', 10),
    isAuthenticated,
    validateFormData,
    createVehicleController,
  );
  router.post(
    '/api/vehicle/update/:id',
    multerUpload.array('images', 10),
    isAuthenticated,
    isVehicleOwner,
    validateFormData,
    updateVehicleController,
  );
  router.get('/api/vehicle', isAuthenticated, getVehiclesController);
  router.get(
    '/api/vehicle/images/:id',
    isAuthenticated,
    isVehicleOwner,
    getVehicleImagesController,
  );
  router.post(
    '/api/vehicle/search',
    isAuthenticated,
    validateSearchParams,
    searchVehiclesController,
  );
  router.post('/api/vehicle/sales', isAuthenticated, searchVehiclesController);
  router.delete(
    '/api/vehicle/delete/:id',
    isAuthenticated,
    isVehicleOwner,
    deleteVehicleController,
  );
};
