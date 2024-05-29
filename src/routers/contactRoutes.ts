import { Router } from 'express';
import {
  addContact,
  getMyContacts,
  deleteContact,
  updateContact,
} from '~/db/controllers/contact.controller';
import { isAuthenticated, isContactOwner } from '~/middlewares';

export default (router: Router) => {
  router.post('/api/contact/add', isAuthenticated, addContact);
  router.get('/api/contact', isAuthenticated, getMyContacts);
  router.post(
    '/api/contact/update/:id',
    isAuthenticated,
    isContactOwner,
    updateContact,
  );
  router.delete(
    '/api/contact/delete/:id',
    isAuthenticated,
    isContactOwner,
    deleteContact,
  );
};