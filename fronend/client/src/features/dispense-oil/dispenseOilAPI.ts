import fetch from 'node-fetch';

import { StartDispensingType } from '../../types';

export const fetchCarDetailsBasedOnRegNumber = async (registrationNumber: string) => {
  const response =
    await fetch(`http://${window.location.hostname}:8000/oilTypes/reg/?vehicle_reg=${registrationNumber}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

  if (response.status !== 200) throw new Error('Request failed.')
  const result = await response.json();
  const typesWithRename = result.types.map((item: { id: string; oil_type: string; }) => ({ id: item.id, name: item.oil_type }));

  return {
    ...result,
    types: typesWithRename
  };
};

export const startDispensingOil = async ({
  registrationNumber,
  carManufacturer,
  carModel,
  carEngineType,
  suggestedQuantity,
  dispensedQuantity,
  oilType,
  dispenseType,
  userId,
}: StartDispensingType) => {

  const params = {
    registrationNumber: registrationNumber || null,
    suggestedQuantity: suggestedQuantity || null,
    carManufacturer: carManufacturer || null,
    carModel: carModel || null,
    carEngineType: carEngineType || null,
    dispensedQuantity,
    oilType,
    dispenseType,
    userId,
  };

  const response =
    await fetch(`http://${window.location.hostname}:8000/dispenses/`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' }
    });

  return await response.json();
};

export const fetchOilTypes = async () => {
  const response =
    await fetch(`http://${window.location.hostname}:8000/oilTypes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

  const result = await response.json();
  return result.map((item: { id: string; oil_type: string; }) => ({ id: item.id, name: item.oil_type }));
};