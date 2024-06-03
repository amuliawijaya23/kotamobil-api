import { Request, Response } from 'express';

import {
  getUserContacts,
  createContact,
  deleteContacts,
  updateContactById,
} from '../actions/contact.action';
import { queryVehicles } from '../actions/vehicle.action';

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
    const { contactIds } = request.body;

    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      return response
        .status(400)
        .json({ message: 'Invalid contact Ids provided' })
        .end();
    }

    const associatedVehicles = await queryVehicles({
      buyerId: { $in: contactIds },
    });

    if (associatedVehicles.length > 0) {
      const associatedBuyerIds = associatedVehicles.map(
        (vehicle) => vehicle.buyerId,
      );

      const associatedVehicleIds = associatedVehicles.map((vehicle) =>
        vehicle._id.toString(),
      );

      return response.status(400).json({
        message:
          'Cannot delete contacts. They are associated with vehicles in the inventory. Please update the vehicle buyer information before deleting',
        associatedBuyerIds,
        associatedVehicleIds,
      });
    }

    await deleteContacts(contactIds);
    return response
      .status(200)
      .json({ message: 'Contacts deleted successfully' });
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
