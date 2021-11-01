import { DispenseRegNumberFlowStep, DispenseVehicleDetailsFlowStep, DispenseQuantityFlowStep, BarrelQuantityFlowStep } from './enums'

export type OilType = {
  id: string;
  name: string;
} | null;

export type StartDispensingType = {
  registrationNumber?: string;
  carManufacturer?: string;
  carModel?: string;
  carEngineType?: string;
  suggestedQuantity?: string;
  dispensedQuantity: string;
  oilType: string;
  dispenseType: string;
  userId: string;
};

export type DispenseCarRegNumberResponseType = {
  recommendedQuantity: string;
  details: string;
  types: OilType[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean;
  currentStep: DispenseRegNumberFlowStep;
  registrationNumber: string;
  selectedOilType: string;
  selectedQuantity: string;
  remainingInBarrel: string;
};

export type DispenseCarVehicleDetailsResponseType = {
  recommendedQuantity: string;
  details: string;
  types: OilType[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean;
  currentStep: DispenseVehicleDetailsFlowStep;
  carManufacturer: string;
  carModel: string;
  carEngineType: string;
  selectedOilType: string;
  selectedQuantity: string;
  remainingInBarrel: string;
};

export type DispenseQuantityResponseType = {
  types: OilType[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean;
  currentStep: DispenseQuantityFlowStep;
  selectedOilType: string;
  selectedQuantity: string;
  remainingInBarrel: string;
};

export type UserAuth = {
  id: string;
  name: string;
  isLoggedIn: boolean;
};

export type BarrelResponseType = {
  types: OilType[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean;
  currentStep: BarrelQuantityFlowStep;
  selectedOilType: string;
  selectedBarrelType: string;
  selectedBarrelId: string;
};