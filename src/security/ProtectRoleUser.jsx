import { useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

export const ProtectedRouteUser = (props) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedData = jwtDecode(token);
        if (decodedData.role !== "user") {
          navigate("/*"); // Navigate to "not found" if user is not authorized
        }
      } catch (error) {
        navigate("/*"); // Navigate to "not found" if token is invalid
      }
    }
    // If no token, do nothing and allow access to home
  }, [token, navigate]);

  if (!token) {
    // Allow access to home if there's no token
    return <Outlet {...props} />;
  }

  try {
    const decodedData = jwtDecode(token);
    if (decodedData.role === "user") {
      return <Outlet {...props} />; // Allow access to user-protected routes
    } else {
      return <Navigate to="/*" />; // Redirect to "not found" if not authorized
    }
  } catch (error) {
    return <Navigate to="/*" />; // Redirect to "not found" if token is invalid
  }
};
