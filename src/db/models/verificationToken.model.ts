import mongoose, { Schema, model, Document } from 'mongoose';

export interface VerificationTokenInterface extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const verificationTokenSchema = new Schema<VerificationTokenInterface>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 21600 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret._id = ret._id.toString();
        ret.userId = ret.userId.toString();
        delete ret.__v;
        return ret;
      },
    },
  },
);

const VerificationToken = model('VerificationToken', verificationTokenSchema);
export default VerificationToken;
