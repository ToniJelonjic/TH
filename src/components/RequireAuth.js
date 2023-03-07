import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (role) => {
  const allowedRoles = [1, 2, 3];
  const { auth } = useAuth();
  const location = useLocation();
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  return loggedIn ? (
    <Navigate to="/naslovnica" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
