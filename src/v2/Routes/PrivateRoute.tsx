import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/getAccessToken";
import { routePath } from "./Routes";

type PropTypes = { isPrivate: boolean };
const PrivateRoute = ({ isPrivate }: PropTypes) => {
  const isAuthenticated = getAccessToken() !== null;

  if (isPrivate === true) {
    return isAuthenticated === true ? (
      <Outlet />
    ) : (
      <Navigate to={routePath.signIn} />
    );
  } else {
    return isAuthenticated === true ? (
      <Navigate to={routePath.todo} />
    ) : (
      <Outlet />
    );
  }
};

export default PrivateRoute;
