import mongoose, { Schema } from 'mongoose';

export const contactSchema = new Schema({
  ownerId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  mobile: { type: String, unique: true, required: true },
  address: String,
  facebook: String,
  instagram: String,
  tiktok: String,
  twitter: String,
});

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;
