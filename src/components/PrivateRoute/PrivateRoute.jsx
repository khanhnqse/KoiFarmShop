/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PATHS } from "../../constant/path";

const PrivateRoute = ({
  children,
  requiredRole,
  restrictedToManagerOrStaff,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={PATHS.HOME} />;
  }

  if (
    restrictedToManagerOrStaff &&
    user.role !== "manager" &&
    user.role !== "staff"
  ) {
    return <Navigate to={PATHS.HOME} />;
  }

  return children;
};

export default PrivateRoute;
