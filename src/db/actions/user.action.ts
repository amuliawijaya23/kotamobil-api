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

export const findUserByVerificationToken = async (
  verificationToken: string,
): Promise<UserInterface | null> => {
  try {
    const user = await User.findOne({ verificationToken }).exec();
    return user ? (user.toJSON() as UserInterface) : null;
  } catch (error) {
    throw new Error(`Error finding user by verification token: ${error}`);
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
  updateData: Record<string, any>,
): Promise<UserInterface | null> => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      returnOriginal: false,
      returnDocument: 'after',
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
