import mongoose, { Schema, model, Document } from 'mongoose';

export interface PasswordResetTokenInterface extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const passwordResetTokenSchema = new Schema<PasswordResetTokenInterface>(
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
        delete ret.__V;
        return ret;
      },
    },
  },
);

const PasswordResetToken = model(
  'PasswordResetToken',
  passwordResetTokenSchema,
);
export default PasswordResetToken;
