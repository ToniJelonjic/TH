import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("role"));
  if (role === 1) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/naslovnica"} />;
  }
};

export default AdminRoutes;
