import Listing from '@db/models/listing.model';

const getListings = () => Listing.find();
const getUserListings = (id: string) => Listing.find({ ownerId: id });
const queryListings = (param: { $and: [Object[]] }) =>
  Listing.find({ ...param });
const createListing = (values: Record<string | number, any>) =>
  new Listing(values)
    .save()
    .then((listing: Record<string | number, any>) => listing.toObject());
const deleteListingById = (id: string) =>
  Listing.findByIdAndDelete({ _id: id });
const updateListingById = (id: string, values: Record<string | number, any>) =>
  Listing.findByIdAndUpdate({ _id: id }, values);

export {
  getListings,
  getUserListings,
  queryListings,
  createListing,
  deleteListingById,
  updateListingById,
};
