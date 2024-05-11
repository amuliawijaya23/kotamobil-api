import { Router } from 'express';

import {
  login,
  register,
  logout,
  deleteUser,
  updateUser,
} from '../db/controllers/user.controller';

import { isAuthenticated, isOwner } from '../middlewares';

export default (router: Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.delete('/auth/logout/:id', isAuthenticated, isOwner, logout);
  router.delete('/auth/delete/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/auth/update/:id', isAuthenticated, isOwner, updateUser);
};
