import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from './app/hooks';
import { userAuthState } from './features/user/userSlice';
import { UserAuth } from './types';


export default function ProtectedRoute({ component: Component, ...rest }: any) {
  const userStore = useAppSelector(userAuthState) as UserAuth;

  return (
    <Route
      {...rest}
      render={(props) => {
        return userStore.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    >
    </Route>
  );
}
