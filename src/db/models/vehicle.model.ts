import mongoose, { Schema, model, Document } from 'mongoose';

export interface VehicleInterface extends Omit<Document, 'model'> {
  ownerId: mongoose.Types.ObjectId;
  buyerId?: mongoose.Types.ObjectId;
  name: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  odometer: number;
  color: string;
  condition: 'New' | 'Used';
  assembly: 'Complete-Built-Up' | 'Complete-Knock-Down';
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  bodyType:
    | 'Sedan'
    | 'SUV'
    | 'MPV'
    | 'Coupe'
    | 'Hatchback'
    | 'Sport'
    | 'Convertible'
    | 'Pickup';
  sold: boolean;
  plateNumber?: string;
  description?: string;
  images?: string[];
  specification?: string[];
  dateAdded: Date;
  taxDate?: Date;
  dateSold?: Date;
  price: number;
  creditPrice?: number;
  marketPrice?: number;
  purchasePrice?: number;
  soldPrice?: number;
}

export const vehicleSchema = new Schema<VehicleInterface>(
  {
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    buyerId: { type: Schema.Types.ObjectId, ref: 'Contact' },
    name: { type: String, required: true },
    vin: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    odometer: { type: Number, required: true },
    color: { type: String, required: true },
    condition: { type: String, required: true, enum: ['New', 'Used'] },
    assembly: {
      type: String,
      required: true,
      enum: ['Complete-Built-Up', 'Complete-Knock-Down'],
    },
    transmission: {
      type: String,
      required: true,
      enum: ['Automatic', 'Manual'],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
    },
    bodyType: {
      type: String,
      required: true,
      enum: [
        'Sedan',
        'SUV',
        'MPV',
        'Coupe',
        'Hatchback',
        'Sport',
        'Convertible',
        'Pickup',
      ],
    },
    sold: { type: Boolean, required: true },
    plateNumber: { type: String },
    description: { type: String },
    images: { type: [String] },
    specification: { type: [String] },
    dateAdded: { type: Date, required: true },
    dateSold: { type: Date },
    taxDate: { type: Date },
    price: { type: Number, required: true },
    creditPrice: { type: Number },
    marketPrice: { type: Number },
    purchasePrice: { type: Number },
    soldPrice: { type: Number },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret._id = ret._id.toString();
        ret.ownerId = ret.ownerId.toString();
        if (ret.buyerId) ret.buyerId = ret.buyerId.toString();
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Vehicle = model('Vehicle', vehicleSchema);
export default Vehicle;
