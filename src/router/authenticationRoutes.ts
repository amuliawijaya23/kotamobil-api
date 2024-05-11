import { Router } from 'express';

import { login, register } from '../db/controllers/authentication.controller';

export default (router: Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
