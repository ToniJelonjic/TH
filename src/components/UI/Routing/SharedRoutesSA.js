import React from "react";
import { Navigate } from "react-router-dom";

const SharedRoutes = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("role"));
  if (role === 3 || role === 1) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/naslovnica"} />;
  }
};

export default SharedRoutes;
