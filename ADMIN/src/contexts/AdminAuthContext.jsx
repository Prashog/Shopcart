import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAdminToken,
  setAdminToken,
  removeAdminToken,
} from "../utils/adminAuth";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 New

  useEffect(() => {
    const token = getAdminToken();
    if (token) setAdmin({ token });
    setLoading(false); // 👈 Once token is checked
  }, []);

  const login = (token) => {
    setAdminToken(token);
    setAdmin({ token });
  };

  const logout = () => {
    removeAdminToken();
    setAdmin(null);
  };

  const isAuthenticated = !!admin;

  return (
    <AdminAuthContext.Provider
      value={{ admin, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};