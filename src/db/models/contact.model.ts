import mongoose, { Schema, model, Document } from 'mongoose';

export interface ContactInterface extends Document {
  ownerId: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email?: string;
  mobile: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  linkedIn?: string;
}

export const contactSchema = new Schema<ContactInterface>(
  {
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    address: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    twitter: { type: String },
    linkedIn: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret._id = ret._id.toString();
        ret.ownerId = ret.ownerId.toString();
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Contact = model('Contact', contactSchema);
export default Contact;
