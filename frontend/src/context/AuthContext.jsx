import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../utils/api';
import { toast } from 'react-toastify';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
      setLoading(true);
      const { user } = await getCurrentUser();
      setUser(user);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await registerUser(userData);
      setUser(user);
      setLoading(false);
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      setError(error.message || 'Registration failed');
      setLoading(false);
      toast.error(error.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await loginUser(userData);
      setUser(user);
      setLoading(false);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      setError(error.message || 'Login failed');
      setLoading(false);
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setLoading(false);
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      setError(error.message || 'Logout failed');
      setLoading(false);
      toast.error(error.message || 'Logout failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};