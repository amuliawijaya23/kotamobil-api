import mongoose, { connect } from 'mongoose';
import Listing, { listingSchema } from '../models/listing.model';
import dotenv from 'dotenv';

import listingSeed from './listingSeed';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL || MONGODB_URL.length === 0) {
  throw new Error('Please add your MongoDB URL');
}

mongoose.Promise = global.Promise;

connect(MONGODB_URL);

mongoose.connection.on('error', (error) => {
  throw new Error(`Fail to connect to MongoDB: ${error}`);
});
mongoose.connection.once('connected', async () => {
  console.log('Connected to MongoDB');
  await mongoose.connection.db.collection('listings').drop();
  console.log('Collection dropped');

  await Listing.insertMany(listingSeed).then((listings) => {
    console.log('Database Seeded');
    mongoose.disconnect();
  });
});
