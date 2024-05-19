import { Router } from 'express';

import {
  addListing,
  getMyListings,
  updateListing,
  deleteListing,
} from '~/db/controllers/listing.controller';
import { isAuthenticated } from '~/middlewares';

export default (router: Router) => {
  router.post('/listing/add', addListing);
  router.get('/listing', isAuthenticated, getMyListings);
  router.post('/listing/update/:id', updateListing);
  router.delete('/listing/delete/:id', deleteListing);
};
