import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
    setRole(JSON.parse(localStorage.getItem("role")));
  }, []);

  return loggedIn ? <Outlet /> : <Navigate to="/prijava" />;
};

export default ProtectedRoutes;
