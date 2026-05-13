import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check for the token you're using in your axios interceptor
  const token = localStorage.getItem("token");

  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the child components (the protected pages)
  return <Outlet />;
};

export default ProtectedRoute;