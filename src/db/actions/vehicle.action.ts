import Vehicle from '~/db/models/vehicle.model';

const getVehicles = () => Vehicle.find();
const getUserVehicles = (id: string) => Vehicle.find({ ownerId: id });
const queryVehicles = (param: { $and: [Object[]] }) =>
  Vehicle.find({ ...param });
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
  Vehicle.findByIdAndUpdate({ _id: id }, values).then(
    (vehicle: Record<string | number, any>) =>
      vehicle ? vehicle.toObject() : vehicle,
  );

export {
  getVehicles,
  getUserVehicles,
  queryVehicles,
  createVehicle,
  deleteVehicleById,
  updateVehicleById,
};
