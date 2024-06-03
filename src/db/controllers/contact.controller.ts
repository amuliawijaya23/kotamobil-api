import { Request, Response } from 'express';

import {
  getUserContacts,
  createContact,
  deleteContactById,
  updateContactById,
} from '../actions/contact.action';

export const getMyContacts = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const contacts = await getUserContacts(user._id);

    return response.status(200).json(contacts).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const addContact = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const data = { ...request.body };

    if (!data.firstName || !data.mobile) {
      return response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
    }

    const contact = await createContact({ ...data, ownerId: user._id });

    return response.status(200).json(contact).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const deleteContact = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const deletedContact = await deleteContactById(id);

    return response.status(200).json(deletedContact).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};

export const updateContact = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const data = { ...request.body };

    if (!id) {
      response.status(400).json({ message: 'Missing required parameters' });
      return;
    }

    if (!data.firstName || !data.mobile) {
      response
        .status(400)
        .json({ message: 'Missing required parameters' })
        .end();
      return;
    }

    const contact = await updateContactById(id, data);
    return response.status(200).json(contact).end();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
      error: 'An unknown error occurred',
    });
  }
};
