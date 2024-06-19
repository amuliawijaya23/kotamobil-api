import { Router } from 'express';
import {
  createContactController,
  updateContactController,
  deleteContactsController,
  getUserContactsController,
  searchContactsController,
} from '~/db/controllers/contact.controller';
import {
  isAuthenticatedAndVerified,
  isContactOwner,
  validateContactFormData,
  validateDeleteContactRequest,
} from '~/middlewares';

export default (router: Router) => {
  router.post(
    '/api/contact/add',
    isAuthenticatedAndVerified,
    validateContactFormData,
    createContactController,
  );
  router.post(
    '/api/contact/update/:id',
    isAuthenticatedAndVerified,
    isContactOwner,
    validateContactFormData,
    updateContactController,
  );
  router.post(
    '/api/contact/delete',
    isAuthenticatedAndVerified,
    validateDeleteContactRequest,
    deleteContactsController,
  );
  router.get(
    '/api/contact',
    isAuthenticatedAndVerified,
    getUserContactsController,
  );
  router.post(
    '/api/contact/search',
    isAuthenticatedAndVerified,
    searchContactsController,
  );
};
