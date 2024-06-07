import User, { UserInterface } from '~/db/models/user.model';

export const createUser = async (
  userData: Partial<UserInterface>,
): Promise<UserInterface> => {
  try {
    return (await new User(userData).save()).toJSON() as UserInterface;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const findUserByEmail = async (
  email: string,
): Promise<UserInterface | null> => {
  try {
    return (await User.findOne({ email }).exec()) as UserInterface;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error}`);
  }
};

export const findUserById = async (
  id: string,
): Promise<UserInterface | null> => {
  try {
    const user = await User.findById(id).exec();
    return user ? (user.toJSON() as UserInterface) : null;
  } catch (error) {
    throw new Error(`Error finding user by id: ${error}`);
  }
};

export const updateUser = async (
  id: string,
  updateData: Partial<UserInterface>,
): Promise<UserInterface | null> => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    return user ? (user.toJSON() as UserInterface) : null;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

export const deleteUser = async (id: string): Promise<UserInterface | null> => {
  try {
    const user = await User.findByIdAndDelete(id).exec();
    return user ? (user.toJSON() as UserInterface) : null;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};
