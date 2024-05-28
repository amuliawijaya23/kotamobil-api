import mongoose, { connect } from 'mongoose';
import Vehicle from '../models/vehicle.model';
import Contact from '../models/contact.model';
import dotenv from 'dotenv';

import vehicleSeed from './vehicleSeed';
import contactSeed from './contactSeed';

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
  await mongoose.connection.db.collection('vehicles').drop();
  await mongoose.connection.db.collection('contacts').drop();
  console.log('Collection dropped');

  await Vehicle.insertMany(vehicleSeed);

  await Contact.insertMany(contactSeed).then(() => {
    console.log('Database Seeded');
    mongoose.disconnect();
  });
});
