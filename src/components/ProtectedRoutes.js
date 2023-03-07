import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles, loggedIn, role }) => {
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/prijava" />;
  }

  if (loggedIn && !allowedRoles.includes(role)) {
    return <Navigate to={location.pathname} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
