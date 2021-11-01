import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStatsDispensesTransaction, fetchStatsOrderTransaction, fetchEnvironmentalBenefits } from './StatisticsTransactionAPI';

export interface VehicleState {
  recommendedQuantity: string;
  details: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VehicleState = {
  recommendedQuantity: '',
  details: '',
  status: 'idle',
};

export const statsDispenseTransactions = createAsyncThunk(
  '/dispenses/',
  async (userId: any) => await fetchStatsDispensesTransaction(userId)
);

export const statsOrderTransactions = createAsyncThunk(
  '/orders/',
  async (userId: any) => await fetchStatsOrderTransaction(userId)
);

export const statsEnvironmentalBenefits = createAsyncThunk(
  '/environmental-benefits/',
  async (userId: any) => await fetchEnvironmentalBenefits(userId)
);

export const statsTransactionSlice = createSlice({
  name: 'dispenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(statsDispenseTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(statsDispenseTransactions.fulfilled, (state, action) => {
        state.status = 'idle';
      }).addCase(statsOrderTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(statsOrderTransactions.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

export default statsTransactionSlice.reducer;
