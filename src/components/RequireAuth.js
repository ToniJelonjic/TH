import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (role) => {
  const allowedRoles = [1, 2, 3];
  const { auth } = useAuth();
  const location = useLocation();

  return auth.username ? (
    <Navigate to="/naslovnica" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
