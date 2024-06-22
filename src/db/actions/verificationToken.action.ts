import { convertToObjectId, randomChar } from '~/lib/helpers';
import VerificationToken, {
  VerificationTokenInterface,
} from '../models/verificationToken.model';

export const createVerificationToken = async (
  userId: string,
): Promise<VerificationTokenInterface> => {
  try {
    const token = randomChar(32);
    return (
      await new VerificationToken({
        userId: convertToObjectId(userId),
        token,
      }).save()
    ).toJSON() as VerificationTokenInterface;
  } catch (error) {
    throw new Error(`Error creating new verification token: ${error}`);
  }
};

export const findVerificationToken = async (
  token: string,
): Promise<VerificationTokenInterface | null> => {
  try {
    const verificationToken = await VerificationToken.findOne({ token }).exec();
    return verificationToken
      ? (verificationToken.toJSON() as VerificationTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error finding verification token: ${error}`);
  }
};

export const findVerificationTokenByUserId = async (
  userId: string,
): Promise<VerificationTokenInterface | null> => {
  try {
    const verificationToken = await VerificationToken.findOne({
      userId: convertToObjectId(userId),
    }).exec();
    return verificationToken
      ? (verificationToken.toJSON() as VerificationTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error finding verification token by userId: ${error}`);
  }
};

export const deleteUserVerificationToken = async (
  userId: string,
): Promise<VerificationTokenInterface | null> => {
  try {
    const deletedToken = await VerificationToken.findOneAndDelete({
      userId: convertToObjectId(userId),
    }).exec();
    return deletedToken
      ? (deletedToken.toJSON() as VerificationTokenInterface)
      : null;
  } catch (error) {
    throw new Error(`Error deleting user verification token: ${error}`);
  }
};
