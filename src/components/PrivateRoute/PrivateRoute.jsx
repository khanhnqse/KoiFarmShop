/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PATHS } from "../../constant/path";

const PrivateRoute = ({ children, requiredRole, restrictedToAdmin }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={PATHS.HOME} />;
  }
  if (restrictedToAdmin && user.role === "admin") {
    return <Navigate to={PATHS.DASHBOARD.INDEX} />;
  }
  return children;
};

export default PrivateRoute;
