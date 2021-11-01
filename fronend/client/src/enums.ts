export enum DispenseRegNumberFlowStep {
  InsertRegistrationNumber,
  SelectOilType,
  SelectQuantity,
  DispenseOil,
  Done,
};

export enum DispenseVehicleDetailsFlowStep {
  Category,
  Manufacturer,
  Model,
  Type,
  SelectOilType,
  SelectQuantity,
  DispenseOil,
  Done,
};

export enum DispenseQuantityFlowStep {
  SelectOilType,
  SelectQuantity,
  DispenseOil,
  Done,
};

export enum BarrelQuantityFlowStep {
  SelectBarrelType,
  SelectOilType,
  Order,
  Done,
};