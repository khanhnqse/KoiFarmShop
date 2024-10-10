/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constant/path";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();
  let timeoutId;

  const login = (token, user) => {
    setIsAuthenticated(true);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    startSessionTimer();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearTimeout(timeoutId);
    navigate(PATHS.LOGIN);
  };

  const startSessionTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      alert("Session timed out. You will be logged out.");
      logout();
    }, 30 * 60 * 1000); // 30 minutes
  };

  const resetSessionTimer = () => {
    clearTimeout(timeoutId);
    startSessionTimer();
  };

  useEffect(() => {
    if (isAuthenticated) {
      startSessionTimer();
      window.addEventListener("mousemove", resetSessionTimer);
      window.addEventListener("keydown", resetSessionTimer);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetSessionTimer);
      window.removeEventListener("keydown", resetSessionTimer);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
