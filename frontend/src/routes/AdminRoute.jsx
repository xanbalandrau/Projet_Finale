import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (!token || (user && user.role !== "admin")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
