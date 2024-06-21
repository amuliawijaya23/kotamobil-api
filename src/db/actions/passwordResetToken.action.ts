import { convertToObjectId, randomChar } from '~/lib/helpers';
import PasswordResetToken, {
  PasswordResetTokenInterface,
} from '../models/passwordResetToken.model';

export const createPasswordResetToken = async (
  userId: string,
): Promise<PasswordResetTokenInterface> => {
  try {
    const token = randomChar(32);
    return (
      await new PasswordResetToken({
        userId: convertToObjectId(userId),
        token,
      }).save()
    ).toJSON() as PasswordResetTokenInterface;
  } catch (error) {
    throw new Error(`Error creating new password reset token: ${error}`);
  }
};

export const findPasswordResetToken = async (
  token: string,
): Promise<PasswordResetTokenInterface | null> => {
  try {
    const passwordResetToken = await PasswordResetToken.findOne({
      token,
    }).exec();
    return passwordResetToken
      ? (passwordResetToken.toJSON() as PasswordResetTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error finding passwrod reset token: ${error}`);
  }
};

export const findUserPasswordResetToken = async (
  userId: string,
): Promise<PasswordResetTokenInterface | null> => {
  try {
    const passwordResetToken = await PasswordResetToken.findOne({
      userId: convertToObjectId(userId),
    }).exec();
    return passwordResetToken
      ? (passwordResetToken.toJSON() as PasswordResetTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error finding user password reset token: ${error}`);
  }
};

export const deleteUserPasswordResetToken = async (
  userId: string,
): Promise<PasswordResetTokenInterface | null> => {
  try {
    const deletedPasswordResetToken = await PasswordResetToken.findOneAndDelete(
      { userId: convertToObjectId(userId) },
    ).exec();
    return deletedPasswordResetToken
      ? (deletedPasswordResetToken.toJSON() as PasswordResetTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error deleting user password reset token: ${error}`);
  }
};
