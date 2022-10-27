import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/getAccessToken";
import { routePath, routeAuthority } from "./Routes";

type PropTypes = { authority: string };
const PrivateRoute = ({ authority }: PropTypes) => {
  const isAuthenticated = getAccessToken() !== null;

  if (authority === routeAuthority.requireLoggedIn) {
    return isAuthenticated === true ? (
      <Outlet />
    ) : (
      <Navigate to={routePath.signIn} />
    );
  } else if (authority === routeAuthority.requireNotLoggedIn) {
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
