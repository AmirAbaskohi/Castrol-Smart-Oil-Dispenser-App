import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBarrelTypes } from './BarrelsAPI';

export interface BarrelState {
  types: [],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BarrelState = {
  types: [],
  status: 'idle',
};

export const barrelTypes = createAsyncThunk(
  '/barrels/',
  async () => await getBarrelTypes()
);

const barrelTypesSlice = createSlice({
  name: 'barrelTypes',
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
      .addCase(barrelTypes.pending, state => {
        return { ...state, status: 'loading' };
      })
      .addCase(barrelTypes.fulfilled, state => {
        return { ...state, status: 'idle' };
      })
      .addCase(barrelTypes.rejected, state => {
        return { ...state, status: 'idle', error: true };
      });
  },
});

export default barrelTypesSlice.reducer;
