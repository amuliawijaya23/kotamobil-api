import passport from 'passport';
import { Router } from 'express';
import {
  registerUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  deleteUserProfile,
} from '~/db/controllers/user.controller';
import {
  validateLogin,
  isAuthenticated,
  isNotAuthenticated,
} from '../middlewares';

export default (router: Router) => {
  router.post('/api/auth/register', isNotAuthenticated, registerUser);
  router.post(
    '/api/auth/login',
    isNotAuthenticated,
    validateLogin,
    passport.authenticate('local', { session: true }),
    getUserProfile,
  );
  router.delete('/api/auth/logout', isAuthenticated, logoutUser);
  router.delete('/api/auth/delete', isAuthenticated, deleteUserProfile);
  router.patch('/api/auth/update', isAuthenticated, updateUserProfile);
};
