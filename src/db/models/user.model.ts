import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
