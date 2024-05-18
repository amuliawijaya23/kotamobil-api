import User from '../models/user.model';

const getUsers = () => User.find();
const getUserByEmail = (email: string) => User.findOne({ email });
const getUserById = (id: string) => User.findById(id);
const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user: Record<string, any>) => user.toObject());
const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });
const updateUserById = (id: string, values: Record<string, any>) =>
  User.findOneAndUpdate({ _id: id }, values);

export {
  getUsers,
  getUserByEmail,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
