"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from './useAuth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
       const token = await getAuthToken();
       setToken(token);
      } catch (err) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [toggle]);

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, logout, setToken, setToggle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
