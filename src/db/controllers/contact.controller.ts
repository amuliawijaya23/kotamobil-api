import { Request, Response } from 'express';
import * as contactActions from '~/db/actions/contact.action';
import { UserInterface } from '../models/user.model';

export const createContactController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user as UserInterface | undefined;

    const data = { ...request.body };

    const contact = await contactActions.createContact({
      ...data,
      ownerId: user?._id,
    });

    return response.status(201).json(contact).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const updateContactController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id } = request.params;
    const data = { ...request.body };

    const contact = await contactActions.updateContact(id, data);
    return response.status(200).json(contact).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const deleteContactsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { contactIds } = request.body;

    const deletedContacts = await contactActions.deleteContacts(contactIds);
    return response
      .status(200)
      .json({ message: 'Contacts deleted successfully', deletedContacts })
      .end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const getUserContactsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user;

    const contacts = await contactActions.findContacts({
      ownerId: (user as UserInterface)._id,
    });

    return response.status(200).json(contacts).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};

export const searchContactsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const user = request.user;
    const { search } = request.body;

    const query: { [key: string]: any } = {
      ownerId: (user as UserInterface)._id,
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };

    const contacts = await contactActions.findContacts(query);

    return response.status(200).json(contacts).end();
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({
        message: 'Internal Server Error',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
      .end();
  }
};
