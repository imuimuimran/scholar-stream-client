import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ allowedRoles, children }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

export default RoleRoute;
