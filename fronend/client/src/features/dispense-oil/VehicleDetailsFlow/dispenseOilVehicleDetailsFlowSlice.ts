import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { startDispensingOil } from '../dispenseOilAPI';
import { StartDispensingType, DispenseCarVehicleDetailsResponseType } from '../../../types';
import { DispenseVehicleDetailsFlowStep as Step } from '../../../enums';

const initialState: DispenseCarVehicleDetailsResponseType = {
  types: [],
  details: '',
  status: 'idle',
  error: false,
  currentStep: Step.SelectOilType,
  carManufacturer: '',
  carModel: '',
  carEngineType: '',
  selectedOilType: '',
  selectedQuantity: '',
  recommendedQuantity: '',
  remainingInBarrel: '',
};

export const startDispensing = createAsyncThunk(
  'dispense-oil/vehicle-details-flow/start-dispensing',
  async ({ carManufacturer, carModel, carEngineType, suggestedQuantity, dispensedQuantity, oilType, dispenseType, userId }: StartDispensingType) => {
    const response = await startDispensingOil({
      carManufacturer,
      carModel,
      carEngineType,
      suggestedQuantity,
      dispensedQuantity,
      oilType,
      dispenseType,
      userId,
    });
    return response.data;
  }
);

const slice = createSlice({
  name: 'dispense-oil',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(startDispensing.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(startDispensing.fulfilled, (state, { payload: { remainingInBarrel } }) => {
        return { ...state, status: 'idle', remainingInBarrel, currentStep: Step.Done };
      })
      .addCase(startDispensing.rejected, state => {
        return { ...state, status: 'idle', error: true };
      });
  },
});

export const vehicleDetailsFlowState = (state: RootState) => state.dispenseOilVehicleDetailsFlow;

export const { reset } = slice.actions;

export default slice.reducer;