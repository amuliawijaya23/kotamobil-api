import { Router } from 'express';
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUserProfile,
  sendVerification,
  getUserProfile,
  sendResetPassword,
  resetPassword,
} from '~/db/controllers/user.controller';
import {
  validateLogin,
  isAuthenticated,
  isAuthenticatedAndVerified,
  isNotAuthenticated,
} from '../middlewares';

export default (router: Router) => {
  router.get('/api/auth/verify/:id', verifyUser);
  router.get(
    '/api/auth/verify-session',
    isAuthenticatedAndVerified,
    getUserProfile,
  );
  router.post('/api/auth/send-verification', sendVerification);
  router.post(
    '/api/auth/send-password-reset',
    isNotAuthenticated,
    sendResetPassword,
  );
  router.post(
    '/api/auth/reset-password/:token',
    isNotAuthenticated,
    resetPassword,
  );
  router.post('/api/auth/register', isNotAuthenticated, registerUser);
  router.post('/api/auth/login', isNotAuthenticated, validateLogin, loginUser);
  router.delete('/api/auth/logout', isAuthenticated, logoutUser);
  router.delete('/api/auth/delete', isAuthenticated, deleteUserProfile);
  router.patch('/api/auth/update', isAuthenticated, updateUserProfile);
};
