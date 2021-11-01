import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { DispenseRegNumberFlowStep as Step } from '../../../enums';
import { DispenseCarRegNumberResponseType, StartDispensingType } from '../../../types';
import { fetchCarDetailsBasedOnRegNumber, startDispensingOil } from '../dispenseOilAPI';


const initialState: DispenseCarRegNumberResponseType = {
  recommendedQuantity: '',
  details: '',
  types: [],
  status: 'idle',
  error: false,
  currentStep: Step.InsertRegistrationNumber,
  registrationNumber: '',
  selectedOilType: '',
  selectedQuantity: '',
  remainingInBarrel: '',
};

export const getCarDetails = createAsyncThunk(
  'dispense-oil/registration-number-flow/get-car-details',
  async (registrationNumber: string) => await fetchCarDetailsBasedOnRegNumber(registrationNumber),
);

export const startDispensing = createAsyncThunk(
  'dispense-oil/registration-number-flow/start-dispensing',
  async ({ registrationNumber, suggestedQuantity, dispensedQuantity, oilType, dispenseType, userId }: StartDispensingType) => {
    const response = await startDispensingOil({ registrationNumber, suggestedQuantity, dispensedQuantity, oilType, dispenseType, userId });
    return response.data;
  }
);

const slice = createSlice({
  name: 'dispense-oil',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    clearError: state => ({ ...state, error: false }),
    oilTypeSelected: (state, action) => ({ ...state, selectedOilType: action.payload, currentStep: Step.SelectQuantity }),
    quantityConfirmed: (state, action) => ({ ...state, selectedQuantity: action.payload, currentStep: Step.DispenseOil }),
    goBack: state => {
      switch (state.currentStep) {
        case Step.InsertRegistrationNumber:
        case Step.SelectOilType:
          return { ...initialState };
        case Step.SelectQuantity:
          return { ...state, selectedQuantity: '', currentStep: Step.SelectOilType };
        case Step.DispenseOil:
          return { ...state, currentStep: Step.SelectQuantity };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCarDetails.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(getCarDetails.fulfilled, (state, { payload: { recommendedQuantity, details, types } }) => {
        return { ...state, status: 'idle', recommendedQuantity, details, types, currentStep: Step.SelectOilType };
      })
      .addCase(getCarDetails.rejected, state => {
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

export const regNumberFlowState = (state: RootState) => state.dispenseOilRegNumberFlow;

export const { reset, oilTypeSelected, quantityConfirmed, clearError, goBack } = slice.actions;

export default slice.reducer;