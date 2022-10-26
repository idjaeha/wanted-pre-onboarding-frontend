import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/getAccessToken";
import { routePath, routeType } from "./Routes";

type PropTypes = { type: string };
const PrivateRoute = ({ type }: PropTypes) => {
  const isAuthenticated = getAccessToken() !== null;

  if (type === routeType.requireLoggedIn) {
    return isAuthenticated === true ? (
      <Outlet />
    ) : (
      <Navigate to={routePath.signIn} />
    );
  } else if (type === routeType.requireNotLoggedIn) {
    return isAuthenticated === true ? (
      <Navigate to={routePath.todo} />
    ) : (
      <Outlet />
    );
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
