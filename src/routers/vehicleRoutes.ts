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
  isAuthenticatedAndVerified,
  validateVehicleFormData,
  validateSearchParams,
  isVehicleOwner,
  multerUpload,
} from '~/middlewares';

export default (router: Router) => {
  router.post(
    '/api/vehicle/add',
    multerUpload.array('images', 10),
    isAuthenticatedAndVerified,
    validateVehicleFormData,
    createVehicleController,
  );
  router.post(
    '/api/vehicle/update/:id',
    multerUpload.array('images', 10),
    isAuthenticatedAndVerified,
    isVehicleOwner,
    validateVehicleFormData,
    updateVehicleController,
  );
  router.get('/api/vehicle', isAuthenticatedAndVerified, getVehiclesController);
  router.get(
    '/api/vehicle/images/:id',
    isAuthenticatedAndVerified,
    isVehicleOwner,
    getVehicleImagesController,
  );
  router.post(
    '/api/vehicle/search',
    isAuthenticatedAndVerified,
    validateSearchParams,
    searchVehiclesController,
  );
  router.post(
    '/api/vehicle/sales',
    isAuthenticatedAndVerified,
    searchVehiclesController,
  );
  router.delete(
    '/api/vehicle/delete/:id',
    isAuthenticatedAndVerified,
    isVehicleOwner,
    deleteVehicleController,
  );
};
