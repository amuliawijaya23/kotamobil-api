import mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
  name: { type: String, required: true },
  vin: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  sold: { type: Boolean, required: true },
  odometer: { type: Number, required: true },
  color: { type: String, required: true },
  condition: { type: String, required: true },
  plateNumber: { type: String, required: true },
  assembly: { type: String, required: true },
  transmission: { type: String, required: true },
  fuelType: { type: String, required: true },
  specification: [String],
  description: String,
  taxDate: { type: Date, required: true },
  price: { type: Number, required: true },
  creditPrice: Number,
  marketPrice: Number,
  ownerId: { type: String, ref: 'User' },
  dateAdded: { type: Date, default: Date.now(), required: true },
  dateSold: Date,
});

const Listing =
  mongoose.models.Listing || mongoose.model('Listing', listingSchema);
export default Listing;