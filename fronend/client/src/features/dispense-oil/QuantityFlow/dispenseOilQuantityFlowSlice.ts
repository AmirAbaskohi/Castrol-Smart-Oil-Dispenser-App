import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { fetchOilTypes, startDispensingOil } from '../dispenseOilAPI';
import { StartDispensingType, DispenseQuantityResponseType } from '../../../types';
import { DispenseQuantityFlowStep as Step } from '../../../enums';

const initialState: DispenseQuantityResponseType = {
  types: [],
  status: 'idle',
  error: false,
  currentStep: Step.SelectOilType,
  selectedOilType: '',
  selectedQuantity: '',
  remainingInBarrel: '',
};

export const getOilTypes = createAsyncThunk(
  'dispense-oil/quantity-flow/get-oil-types',
  async () => await fetchOilTypes()
);

export const startDispensing = createAsyncThunk(
  'dispense-oil/quantity-flow/start-dispensing',
  async ({ dispensedQuantity, oilType, dispenseType, userId }: StartDispensingType) => {
    const response = await startDispensingOil({ dispensedQuantity, oilType, dispenseType, userId });
    return response.data;
  }
);

const slice = createSlice({
  name: 'dispense-oil-quantity',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    clearError: state => ({ ...state, error: false }),
    oilTypeSelected: (state, action) => ({ ...state, selectedOilType: action.payload, currentStep: Step.SelectQuantity }),
    quantityConfirmed: (state, action) => ({ ...state, selectedQuantity: action.payload, currentStep: Step.DispenseOil }),
    goBack: state => {
      switch (state.currentStep) {
        case Step.SelectOilType:
          return { ...initialState };
        case Step.SelectQuantity:
          return { ...state, selectedQuantity: '', currentStep: Step.SelectOilType, error: false };
        case Step.DispenseOil:
          return { ...state, currentStep: Step.SelectQuantity, error: false };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getOilTypes.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(getOilTypes.fulfilled, (state, { payload }) => {
        return { ...state, status: 'idle', types: payload, currentStep: Step.SelectOilType };
      })
      .addCase(getOilTypes.rejected, state => {
        return { ...state, status: 'idle', error: true };
      })
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

export const quantityFlowState = (state: RootState) => state.dispenseOilQuantityFlow;

export const { reset, oilTypeSelected, quantityConfirmed, clearError, goBack } = slice.actions;

export default slice.reducer;