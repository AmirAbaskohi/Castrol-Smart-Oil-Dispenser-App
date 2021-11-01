import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBarrels, barrelResetLevel } from './BarrelsAPI';

export interface BarrelState {
  types: [],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BarrelState = {
  types: [],
  status: 'idle',
};

export const barrelDetails = createAsyncThunk(
  '/barrels/',
  async () => {
    const response = await fetchBarrels();
    return response;
  }
);

export const barrelReset = createAsyncThunk(
  '/barrelReset/',
  async (barrelId: any) => {
    const response = await barrelResetLevel(barrelId);
    return response;
  }
);

const barrelDetailsSlice = createSlice({
  name: 'barrelDetails',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    clearError: state => ({ ...state, error: false }),
    goBack: state => {
      return { ...initialState };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(barrelDetails.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(barrelDetails.fulfilled, state => {
        return { ...state, status: 'idle' };
      })
      .addCase(barrelDetails.rejected, state => {
        return { ...state, status: 'idle', error: true };
      })
      .addCase(barrelReset.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(barrelReset.fulfilled, state => {
        return { ...state, status: 'idle' };
      })
      .addCase(barrelReset.rejected, state => {
        return { ...state, status: 'idle', error: true };
      })
  },
});
export default barrelDetailsSlice.reducer;
