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
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
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
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
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

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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
      value={{
        isAuthenticated,
        token,
        user,
        cart,
        setCart,
        addToCart,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
