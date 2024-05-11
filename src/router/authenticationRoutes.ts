import { Router } from 'express';

import { register } from '../db/controllers/authentication.controller';

export default (router: Router) => {
  router.post('/auth/register', register);
};
