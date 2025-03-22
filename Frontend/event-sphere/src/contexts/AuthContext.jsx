import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Clear previous errors
      setAuthError(null);
      
      const data = await AuthService.login(email, password);
      setCurrentUser(data.user);
      toast.success('Logged in successfully!');
      return data;
    } catch (error) {
      // Handle specific error cases based on error response
      let message = 'Login failed';
      
      // Check for server error response
      if (error.response) {
        const statusCode = error.response.status;
        const serverMessage = error.response.data?.message;
        
        if (statusCode === 404) {
          // User not found
          message = 'No user exists with this email. Please sign up first.';
          setAuthError({ type: 'user_not_found', message });
        } else if (statusCode === 401) {
          // Incorrect password
          message = 'Incorrect password. Please try again.';
          setAuthError({ type: 'incorrect_password', message });
        } else if (serverMessage) {
          // Use server's error message if available
          message = serverMessage;
          setAuthError({ type: 'server_error', message });
        }
      }
      
      toast.error(message);
      throw { ...error, customMessage: message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Clear previous errors
      setAuthError(null);
      
      const data = await AuthService.signup(name, email, password);
      toast.success('Signup successful! Please login.');
      return data;
    } catch (error) {
      let message = 'Signup failed';
      
      // Check for duplicate email error
      if (error.response && error.response.status === 409) {
        message = 'A user with this email already exists. Please login instead.';
        setAuthError({ type: 'email_exists', message });
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
        setAuthError({ type: 'server_error', message });
      }
      
      toast.error(message);
      throw { ...error, customMessage: message };
    }
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setAuthError(null);
    toast.info('Logged out successfully');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    authError,
    clearError: () => setAuthError(null),
    isAuthenticated: AuthService.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
