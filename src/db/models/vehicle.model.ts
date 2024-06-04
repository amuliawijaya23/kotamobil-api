import { Timestamp } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export const vehicleSchema = new Schema(
  {
    name: { type: String, required: true },
    images: [String],
    vin: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyType: { type: String, required: true },
    sold: { type: Boolean, required: true },
    odometer: { type: Number, required: true },
    color: { type: String, required: true },
    condition: { type: String, required: true },
    plateNumber: String,
    assembly: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    specification: [String],
    description: String,
    taxDate: Date,
    price: { type: Number, required: true },
    creditPrice: Number,
    marketPrice: Number,
    purchasePrice: Number,
    soldPrice: Number,
    ownerId: { type: String, ref: 'users' },
    buyerId: { type: String, ref: 'contacts' },
    dateAdded: { type: Date, default: Date.now(), required: true },
    dateSold: Date,
  },
  { timestamps: true },
);

const Vehicle =
  mongoose.models.Listing || mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
