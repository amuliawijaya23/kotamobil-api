import { Router } from 'express';

import {
  addListing,
  getMyListings,
  updateListing,
  deleteListing,
} from '~/db/controllers/listing.controller';
import { isAuthenticated } from '~/middlewares';

export default (router: Router) => {
  router.post('/api/listing/add', addListing);
  router.get('/api/listing', isAuthenticated, getMyListings);
  router.post('/api/listing/update/:id', updateListing);
  router.delete('/api/listing/delete/:id', deleteListing);
};
