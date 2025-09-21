import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const baseURL = `${import.meta.env.VITE_BACKEND_URL}`;
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.get(`${baseURL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error.message);
        setIsAuthenticated(false);
        navigate('/login');
      }
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
