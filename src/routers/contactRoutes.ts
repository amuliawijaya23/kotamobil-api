import { Router } from 'express';
import {
  createContactController,
  updateContactController,
  deleteContactsController,
  getUserContactsController,
  searchContactsController,
} from '~/db/controllers/contact.controller';
import {
  isAuthenticated,
  isContactOwner,
  validateContactFormData,
  validateDeleteContactRequest,
} from '~/middlewares';

export default (router: Router) => {
  router.post(
    '/api/contact/add',
    isAuthenticated,
    validateContactFormData,
    createContactController,
  );
  router.post(
    '/api/contact/update/:id',
    isAuthenticated,
    isContactOwner,
    validateContactFormData,
    updateContactController,
  );
  router.post(
    '/api/contact/delete',
    isAuthenticated,
    validateDeleteContactRequest,
    deleteContactsController,
  );
  router.get('/api/contact', isAuthenticated, getUserContactsController);
  router.post('/api/contact/search', isAuthenticated, searchContactsController);
};
