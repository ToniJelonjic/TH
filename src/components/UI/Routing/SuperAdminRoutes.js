import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SuperAdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));
  if (role === 1) {
    return <>{children}</>;
  } else {
    return <div>Page Not Found</div>;
  }
};

export default SuperAdminRoutes;
