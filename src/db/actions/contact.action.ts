import mongoose from 'mongoose';
import Contact, { ContactInterface } from '../models/contact.model';

const convertToObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};

export const createContact = async (
  contactData: Partial<ContactInterface>,
): Promise<ContactInterface> => {
  try {
    if (typeof contactData.ownerId === 'string') {
      contactData.ownerId === convertToObjectId(contactData.ownerId);
    }

    const contact = new Contact(contactData);
    return (await contact.save()).toJSON() as ContactInterface;
  } catch (error) {
    throw new Error(`Error creating contact: ${error}`);
  }
};

export const findContactById = async (
  id: string,
): Promise<ContactInterface | null> => {
  try {
    const contact = await Contact.findById(id).exec();
    return contact ? (contact.toJSON() as ContactInterface) : null;
  } catch (error) {
    throw new Error(`Error finding contact by id: ${error}`);
  }
};

export const updateContact = async (
  id: string,
  updateData: Partial<ContactInterface>,
): Promise<ContactInterface | null> => {
  try {
    if (updateData.ownerId && typeof updateData.ownerId === 'string') {
      updateData.ownerId = convertToObjectId(updateData.ownerId);
    }

    const contact = await Contact.findByIdAndUpdate(id, updateData, {
      returnOriginal: false,
      returnDocument: 'after',
    }).exec();

    return contact ? (contact.toJSON() as ContactInterface) : null;
  } catch (error) {
    throw new Error(`Error updating contact: ${error}`);
  }
};

export const deleteContact = async (
  id: string,
): Promise<ContactInterface | null> => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    return contact ? (contact.toJSON() as ContactInterface) : null;
  } catch (error) {
    throw new Error(`Error deleting contact: ${error}`);
  }
};

export const deleteContacts = async (
  ids: string[],
): Promise<ContactInterface[]> => {
  try {
    const objectIds = ids.map((id) => convertToObjectId(id));
    const contacts = await Contact.find({ _id: { $in: objectIds } }).exec();
    await Contact.deleteMany({
      _id: { $in: objectIds },
    }).exec();
    return contacts.length > 0
      ? (contacts.map((contact) => contact.toJSON()) as ContactInterface[])
      : contacts;
  } catch (error) {
    throw new Error(`Error deleting contacts: ${error}`);
  }
};

export const findContacts = async (
  query: Record<string, any>,
): Promise<ContactInterface[]> => {
  try {
    if (query.ownerId && typeof query.ownerId === 'string') {
      query.ownerId = convertToObjectId(query.ownerId);
    }

    const contacts = await Contact.find(query).exec();
    return contacts.length > 0
      ? (contacts.map((contact) => contact.toJSON()) as ContactInterface[])
      : contacts;
  } catch (error) {
    throw new Error(`Error finding contacts: ${error}`);
  }
};
