import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import dispenseOilRegNumberFlowReducer from '../features/dispense-oil/RegistrationNumberFlow/dispenseOilRegNumberFlowSlice';
import dispenseOilVehicleDetailsFlowReducer from '../features/dispense-oil/VehicleDetailsFlow/dispenseOilVehicleDetailsFlowSlice';
import dispenseOilQuantityFlowReducer from '../features/dispense-oil/QuantityFlow/dispenseOilQuantityFlowSlice';
import statsTransactionReducer from "../features/statistics/StatisticsTransactionSlice";
import barrelQuantityFlowReducer from '../features/barrels/barrelOilTypesSlice';

export const store = configureStore({
  reducer: {
    userAuth: userReducer,
    dispenseOilRegNumberFlow: dispenseOilRegNumberFlowReducer,
    dispenseOilQuantityFlow: dispenseOilQuantityFlowReducer,
    dispenseOilVehicleDetailsFlow: dispenseOilVehicleDetailsFlowReducer,
    statsTransaction: statsTransactionReducer,
    barrelQuantityFlow: barrelQuantityFlowReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;