import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
