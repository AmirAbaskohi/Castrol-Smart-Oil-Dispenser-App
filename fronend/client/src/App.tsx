import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { useEffect } from "react";

import { useAppDispatch } from './app/hooks';

import { useAppSelector } from './app/hooks';
import { userAuthState } from './features/user/userSlice';
import { UserAuth } from './types';

import { DispenseOil } from './features/dispense-oil/DispenseOil';
import { DispenseOilVehicleDetails } from './features/dispense-oil/VehicleDetailsFlow/DispenseOilVehicleDetails';
import { DispenseOilRegistrationNumber } from './features/dispense-oil/RegistrationNumberFlow/DispenseOilRegistrationNumber';
import { DispenseOilQuantity } from './features/dispense-oil/QuantityFlow/DispenseOilQuantity';
import { Barrels } from "./features/barrels/Barrels";
import { BarrelsLevel } from "./features/barrels/BarrelsLevel";
import { BarrelsReorderSelect } from "./features/barrels/BarrelsReorderSelect";
import { Statistics } from "./features/statistics/Statistics";
import { StatisticsDispenses } from "./features/statistics/Dispenses/StatisticsDispenses";
import { StatisticsDispenseTransactions } from "./features/statistics/Dispenses/StatisticsDispenseTransactions";
import { StatisticsDispensesGraph } from "./features/statistics/Dispenses/StatisticsDispensesGraph";
import { StatisticsOrders } from "./features/statistics/Orders/StatisticsOrders";
import { StatisticsOrderTransactions } from "./features/statistics/Orders/StatisticsOrderTransactions"
import { StatisticsOrdersGraph } from "./features/statistics/Orders/StatisticsOrdersGraph";
import { StatisticsEnvironmentalBenefits } from "./features/statistics/EnvironmentalBenefits/StatisticsEnvironmentalBenefits";
import { User } from "./features/user/User";
import { Home } from "./features/home/Home";
import { PumpProceduresPage } from "./features/admin/pump-procedures/PumpProceduresPage";
import { CredentialsLogin } from "./features/login/CredentialsLogin";
import { RfidLogin } from "./features/login/RfidLogin"
import ProtectedRoute from "./ProtectedRoute";
import { BarrelsSelectOilType } from "./features/barrels/BarrelsSelectOilType";
import { BarrelConfirmation } from "./features/barrels/BarrelConfirmation";
import { BarrelsDone } from "./features/barrels/BarrelsDone";

import { login, logout } from './features/user/userSlice';

import './App.css';

const App = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(userAuthState) as UserAuth;

  const setupWsConnection = () => {
    const ws = new WebSocket("ws://" + window.location.hostname + ":8000/rfid_login");
    let timeoutFunc: any;

    ws.onopen = () => {
      console.log(`[${new Date().toLocaleString()}] WS connection opened.`);
    };

    ws.onmessage = (event) => {
      const user = JSON.parse(event.data);
      console.log(`[${new Date().toLocaleString()}] WS data: ${JSON.stringify(user)}`);
      const { id, name } = user;
      dispatch(login({ id, name, timeoutFunc }));
      history.push("/");

      if (timeoutFunc) clearTimeout(timeoutFunc);

      // timeoutFunc = setTimeout(() => {
      //   console.log(`[${new Date().toLocaleString()}] Logging out...`);
      //   dispatch(logout());
      // }, 300000); // logout automatically after 5 min
    };

    ws.onclose = () => {
      console.log(`[${new Date().toLocaleString()}] WS connection closed.`)
    };
  }

  useEffect(() => {
    setTimeout(() => setupWsConnection(), 5000);
  }, [history, dispatch]);

  return (
    <div className="App">
      <Switch>
        <ProtectedRoute
          path="/barrels/done"
          component={BarrelsDone}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/barrels/oiltypeconfirm"
          component={BarrelConfirmation}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/barrels/oiltype"
          component={BarrelsSelectOilType}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/barrels/info"
          component={BarrelsLevel}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/barrels/reorder"
          component={BarrelsReorderSelect}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/dispenses/graph"
          component={StatisticsDispensesGraph}>
        </ProtectedRoute >
        <ProtectedRoute
          path="/statistics/orders/graph"
          component={StatisticsOrdersGraph}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/dispenses/transactions"
          component={StatisticsDispenseTransactions}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/orders/transactions"
          component={StatisticsOrderTransactions}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/environmental"
          component={StatisticsEnvironmentalBenefits}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/dispenses"
          component={StatisticsDispenses}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics/orders"
          component={StatisticsOrders}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/dispense-oil/vehicle-details"
          component={DispenseOilVehicleDetails}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/dispense-oil/registration-number"
          component={DispenseOilRegistrationNumber}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/dispense-oil/quantity"
          component={DispenseOilQuantity}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/dispense-oil"
          component={DispenseOil}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/barrels"
          component={Barrels}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/statistics"
          component={Statistics}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/user-info"
          component={User}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/admin/pump-procedures"
          component={PumpProceduresPage}>
        </ProtectedRoute>
        <ProtectedRoute
          path="/home"
          component={Home}
        />
        <Route path="/login">
          <CredentialsLogin />
        </Route>
        <Route path="/">
          {userStore.isLoggedIn ? <Home /> : <RfidLogin />}
        </Route>
      </Switch >
    </div >
  );
}

export default App;
