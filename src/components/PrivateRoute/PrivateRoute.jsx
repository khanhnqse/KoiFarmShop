/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { PATHS } from "../../constant/path";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return children;
};

export default PrivateRoute;
