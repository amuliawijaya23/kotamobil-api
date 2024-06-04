import Vehicle from '~/db/models/vehicle.model';

const getVehicles = () => Vehicle.find();
const getUserVehicles = (id: string) =>
  Vehicle.find({ ownerId: id }).sort({ updatedAt: -1 });
const getVehicleById = (id: string) => Vehicle.findOne({ _id: id });
const queryVehicles = (params: Record<string, any>) =>
  Vehicle.find(params).sort({ updatedAt: -1 });
const createVehicle = (values: Record<string | number, any>) =>
  new Vehicle(values)
    .save()
    .then((vehicle: Record<string | number, any>) => vehicle.toObject());
const deleteVehicleById = (id: string) =>
  Vehicle.findByIdAndDelete({ _id: id }).then(
    (vehicle: Record<string | number, any>) =>
      vehicle ? vehicle.toObject() : Vehicle,
  );
const updateVehicleById = (id: string, values: Record<string | number, any>) =>
  Vehicle.findByIdAndUpdate({ _id: id }, values, {
    returnOriginal: false,
    returnDocument: 'after',
  }).then((vehicle: Record<string | number, any>) => vehicle.toObject());

export {
  getVehicles,
  getUserVehicles,
  getVehicleById,
  queryVehicles,
  createVehicle,
  deleteVehicleById,
  updateVehicleById,
};
