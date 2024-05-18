import { Router } from 'express';

import {
  register,
  deleteUser,
  updateUser,
} from '~/db/controllers/user.controller';

import { login, logout } from '~/auth/index';

import { isAuthenticated, isNotAuthenticated } from '../middlewares';

export default (router: Router) => {
  router.post('/auth/register', isNotAuthenticated, register);
  router.post('/auth/login', isNotAuthenticated, login);
  router.delete('/auth/logout/:id', isAuthenticated, logout);
  router.delete('/auth/delete/:id', isAuthenticated, deleteUser);
  router.patch('/auth/update/:id', isAuthenticated, updateUser);
};
