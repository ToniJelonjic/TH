import React from "react";
import { Navigate } from "react-router-dom";

const SuperAdminRoutes = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("role"));
  if (role === 3) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/naslovnica"} />;
  }
};

export default SuperAdminRoutes;
