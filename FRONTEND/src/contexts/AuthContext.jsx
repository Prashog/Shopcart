import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister, getUserProfile } from '../services/api';
import { getToken, setToken, removeToken } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (getToken()) {
        try {
          const { data } = await getUserProfile();
          setUser(data.response); // Extract user object from `response`
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          removeToken();
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials);
    setToken(data.token);
    setIsAuthenticated(true);
    const profile = await getUserProfile();
    setUser(profile.data.response); // Extract user object from `response`
  };

  const register = async (userData) => {
    const { data } = await apiRegister(userData);
    setToken(data.token);
    setIsAuthenticated(true);
    const profile = await getUserProfile();
    setUser(profile.data.response); // ✅ Extract user object from `response`
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};