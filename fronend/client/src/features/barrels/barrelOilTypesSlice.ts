import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getBarrelOilTypes, orderBarrel } from './BarrelsAPI';
import { BarrelQuantityFlowStep as Step } from '../../enums';
import { BarrelResponseType } from '../../types';

const initialState: BarrelResponseType = {
  types: [],
  status: 'idle',
  error: false,
  currentStep: Step.SelectBarrelType,
  selectedOilType: '',
  selectedBarrelType: '',
  selectedBarrelId: ''
};

export const getOilTypes = createAsyncThunk(
  '/barrelOilType/',
  async () => await getBarrelOilTypes()
);

export const barrelOrder = createAsyncThunk(
  '/order/',
  async (barrelOrderData: any) => await orderBarrel(barrelOrderData)
);

const barrelOilTypesSlice = createSlice({
  name: 'barrelOilTypes',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    clearError: state => ({ ...state, error: false }),
    barrelTypeSelected: (state, action,) => ({ ...state, selectedBarrelType: action.payload.type, selectedBarrelId: action.payload.id, currentStep: Step.SelectOilType }),
    oilTypeSelected: (state, action) => ({ ...state, selectedOilType: action.payload, currentStep: Step.Order }),
    goBack: state => {
      switch (state.currentStep) {
        case Step.SelectBarrelType:
          return { ...initialState };
        case Step.SelectOilType:
          return { ...state, selectedOilType: '', currentStep: Step.SelectBarrelType, error: false };
        case Step.Order:
          return { ...state, currentStep: Step.SelectOilType, error: false };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getOilTypes.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(getOilTypes.fulfilled, state => {
        return { ...state, status: 'idle' };
      })
      .addCase(getOilTypes.rejected, state => {
        return { ...state, status: 'idle', error: true };
      })
      .addCase(barrelOrder.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(barrelOrder.fulfilled, state => {
        return { ...state, status: 'idle', currentStep: Step.Done };
      })
      .addCase(barrelOrder.rejected, state => {
        return { ...state, status: 'idle', error: true };
      });
  },
});

export const barrelQuantity = (state: RootState) => state.barrelQuantityFlow;
export const { reset, barrelTypeSelected, oilTypeSelected, clearError, goBack } = barrelOilTypesSlice.actions;
export default barrelOilTypesSlice.reducer;
