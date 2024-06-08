import mongoose from 'mongoose';
import crypto from 'crypto';

export const randomChar = (len: number) =>
  crypto.randomBytes(len).toString('hex');

export const convertToObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};
