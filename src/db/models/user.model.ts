import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInterface extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  picture?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    picture: { type: String },
  },
  { timestamps: true },
);

userSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<UserInterface>('User', userSchema);
export default User;
