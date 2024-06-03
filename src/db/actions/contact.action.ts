import Contact from '../models/contact.model';

const getContacts = () => Contact.find();
const getUserContacts = (id: string) =>
  Contact.find({ ownerId: id }).sort({ firstName: 1 });
const createContact = (values: Record<string, any>) =>
  new Contact(values)
    .save()
    .then((contact: Record<string, any>) => contact.toObject());
const getContactById = (id: string) => Contact.findOne({ _id: id });
const deleteContactById = (id: string) =>
  Contact.findByIdAndDelete({ _id: id }).then(
    (contact: Record<string, any>) => contact && contact.toObject(),
  );
const updateContactById = (id: string, values: Record<string, any>) =>
  Contact.findOneAndUpdate({ _id: id }, values, {
    returnOriginal: false,
    returnDocument: 'after',
  }).then((contact: Record<string, any>) => contact && contact.toObject());
const deleteContacts = (contactIds: string[]) =>
  Contact.deleteMany({ _id: { $in: contactIds } });

export {
  getContacts,
  getUserContacts,
  getContactById,
  createContact,
  deleteContacts,
  deleteContactById,
  updateContactById,
};
