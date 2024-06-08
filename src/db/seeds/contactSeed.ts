import mongoose from 'mongoose';
import { ContactInterface } from '../models/contact.model';
const contactSeed: Partial<ContactInterface>[] = [
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Jimmy',
    lastName: 'Choo',
    email: 'jim.choo@gmail.com',
    mobile: '+62 8170031892',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@gmail.com',
    mobile: '+62 8170032234',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@gmail.com',
    mobile: '+62 8170032345',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@gmail.com',
    mobile: '+62 8170032456',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@gmail.com',
    mobile: '+62 8170032567',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Sophia',
    lastName: 'Davis',
    email: 'sophia.davis@gmail.com',
    mobile: '+62 8170032678',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'William',
    lastName: 'Miller',
    email: 'william.miller@gmail.com',
    mobile: '+62 8170032789',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Olivia',
    lastName: 'Wilson',
    email: 'olivia.wilson@gmail.com',
    mobile: '+62 8170032890',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'James',
    lastName: 'Moore',
    email: 'james.moore@gmail.com',
    mobile: '+62 8170032901',
  },
  {
    ownerId: new mongoose.Types.ObjectId('6663173d23294609821409c2'),
    firstName: 'Isabella',
    lastName: 'Taylor',
    email: 'isabella.taylor@gmail.com',
    mobile: '+62 8170033012',
  },
];

export default contactSeed;
