import { Request, Response } from 'express';

import {
  getUserContacts,
  createContact,
  deleteContacts,
  updateContactById,
  queryContacts,
} from '../actions/contact.action';
import * as vehicleActions from '../actions/vehicle.action';
import { UserInterface } from '../models/user.model';

export const getMyContacts = async (request: Request, response: Response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ message: 'Not Authorized' }).end();
    }

    const contacts = await getUserContacts((user as UserInterface)._id);

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

    const contact = await createContact({
      ...data,
      ownerId: (user as UserInterface)._id,
    });

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

    const associatedVehicles = await vehicleActions.findVehicles({
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

export const searchContacts = async (request: Request, response: Response) => {
  try {
    const user = request.user;
    const { search } = request.body;

    if (!user) {
      response.status(401).json({ message: 'Not Authorized' }).end();
      return;
    }

    const query: { [key: string]: any } = {
      ownerId: (user as UserInterface)._id.toString(),
    };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await queryContacts(query);
    const contactsData = contacts.map((c) => c.toObject());

    return response.status(200).json(contactsData).end();
  } catch (error) {
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
