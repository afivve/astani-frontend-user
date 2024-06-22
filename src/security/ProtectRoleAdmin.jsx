import { useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

export const ProtectedRouteAdmin = (props) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedData = jwtDecode(token);
        if (decodedData.role !== "admin") {
          navigate("/*"); // Navigate to "not found" if user is not admin
        }
      } catch (error) {
        navigate("/"); // Navigate to "not found" if token is invalid
      }
    } else {
      navigate("/"); // Navigate to login if token does not exist
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  try {
    const decodedData = jwtDecode(token);
    if (decodedData.role === "admin") {
      return <Outlet {...props} />;
    } else {
      return <Navigate to="/*" />; // Redirect to "not found" if not admin
    }
  } catch (error) {
    return <Navigate to="/*" />; // Redirect to "not found" if token is invalid
  }
};

export default ProtectedRouteAdmin;
