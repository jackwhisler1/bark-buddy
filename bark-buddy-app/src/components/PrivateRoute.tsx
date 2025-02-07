import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { authToken } = useAuth();

  if (!authToken) {
    // If no authToken is present, redirect to login page
    return <Navigate to="/" />;
  }

  // If authToken is present, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
