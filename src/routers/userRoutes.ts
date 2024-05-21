import { Router } from 'express';

import {
  register,
  deleteUser,
  updateUser,
} from '~/db/controllers/user.controller';

import { login, logout } from '~/auth/index';

import { isAuthenticated, isNotAuthenticated } from '../middlewares';

export default (router: Router) => {
  router.post('/api/auth/register', isNotAuthenticated, register);
  router.post('/api/auth/login', isNotAuthenticated, login);
  router.delete('/api/auth/logout', isAuthenticated, logout);
  router.delete('/api/auth/delete/:id', isAuthenticated, deleteUser);
  router.patch('/api/auth/update/:id', isAuthenticated, updateUser);
};
