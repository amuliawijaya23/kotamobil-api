import { NextFunction, Request, Response } from 'express';
import * as UserActions from '~/db/actions/user.action';
import * as VerificationTokenActions from '~/db/actions/verificationToken.action';
import * as PasswordResetTokenActions from '~/db/actions/passwordResetToken.action';
import { UserInterface } from '../models/user.model';
import { VerificationTokenInterface } from '../models/verificationToken.model';
import { PasswordResetTokenInterface } from '../models/passwordResetToken.model';
import passport from 'passport';
import dotenv from 'dotenv';
import { sendVerificationEmail } from '~/lib/nodemailer';
import { randomChar } from '~/lib/helpers';
dotenv.config();

const COOKIE_NAME = process.env.COOKIE_NAME || 'SESSION';

export const registerUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, firstName, lastName } = request.body;

    if (!email || !password || !firstName) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const existingUser = await UserActions.findUserByEmail(email);

    if (existingUser) {
      return response.status(400).json({ message: 'User already exist' }).end();
    }

    const user = await UserActions.createUser({
      email,
      password,
      firstName,
      lastName,
      isVerified: false,
    });

    const verificationToken =
      await VerificationTokenActions.createVerificationToken(user._id);

    await sendVerificationEmail({
      id: verificationToken.token,
      email: email,
      userId: user._id,
    });

    request.login(user, (error) => {
      if (error) {
        next(error);
      }
      return response.status(201).json(user).end();
    });
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const sendVerification = async (
  request: Request,
  response: Response,
) => {
  try {
    const { userId } = request.body;

    if (!userId) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const user = await UserActions.findUserById(userId);

    if (!user) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    if (user.isVerified) {
      return response
        .status(400)
        .json({ message: 'User is already verified' })
        .end();
    }

    await VerificationTokenActions.deleteUserVerificationToken(userId);
    const verificationToken =
      await VerificationTokenActions.createVerificationToken(userId);

    sendVerificationEmail({
      id: verificationToken.token,
      userId: user._id,
      email: user.email,
    });
    response.status(200).json({ message: 'Verification email sent' }).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const verifyUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params;
  try {
    const verificationToken =
      await VerificationTokenActions.findVerificationToken(id);

    if (!verificationToken) {
      return response
        .status(400)
        .json({ message: 'Invalid or expired token' })
        .end();
    }

    const updatedUser = await UserActions.updateUser(
      verificationToken.userId.toString(),
      {
        $set: { isVerified: true },
      },
    );

    if (!updatedUser) {
      return response
        .status(400)
        .json({ message: 'Invalid or expired token' })
        .end();
    }

    await VerificationTokenActions.deleteUserVerificationToken(updatedUser._id);

    request.login(updatedUser as UserInterface, (error) => {
      if (error) {
        next(error);
      }
      return response.status(200).json(updatedUser).end();
    });
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const loginUser = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'local',
    { session: true },
    (error: Error, user: UserInterface) => {
      if (error) {
        return response.status(401).json({ message: error }).end();
      }

      request.login(user, async () => {
        return response.status(200).json(user).end();
      });
    },
  )(request, response, next);
};

export const logoutUser = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.clearCookie(COOKIE_NAME);
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    request.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      return response
        .status(200)
        .json({ message: 'Logged out successfully' })
        .end();
    });
  });
};

export const getUserProfile = async (request: Request, response: Response) => {
  const userId = (request.user as UserInterface)._id;
  try {
    if (!userId) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const user = await UserActions.findUserById(userId);

    if (!user) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    return response.status(200).json(user).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const updateUserProfile = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = (request.user as UserInterface)?._id;
    const { firstName, lastName, picture } = request.body;

    if (!userId) {
      return response.status(401).json({ message: 'Not authorized ' }).end();
    }

    if (!firstName) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const updatedUser = await UserActions.updateUser(userId, request.body);

    if (!updatedUser) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    return response.status(200).json(updatedUser).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const deleteUserProfile = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = (request.user as UserInterface)?._id;

    if (!userId) {
      return response.status(401).json({ message: 'Not authorized' }).end();
    }

    const deletedUser = await UserActions.deleteUser(userId);

    if (!deletedUser) {
      return response.status(404).json({ message: 'User not found' }).end();
    }

    return response.status(200).json(deletedUser).end();
  } catch (error) {
    return response
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : 'An unknown error occured',
      })
      .end();
  }
};
