import { useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Custom hook for authentication API calls.
 * @returns {Object} - Object containing auth methods.
 */
export const useAuthService = () => {
  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login-user`, { email, password });
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        return { success: true, message: 'Login successful' };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again later.';
      toast.error(message, { position: 'top-center', autoClose: 3000 });
      return { success: false, message };
    }
  }, []);

  const guestLogin = useCallback(async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/guest-login`);
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        return { success: true, message: 'Guest login successful' };
      } else {
        throw new Error(response.data.message || 'Guest login failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again later.';
      toast.error(message, { position: 'top-center', autoClose: 3000 });
      return { success: false, message };
    }
  }, []);

  const signup = useCallback(async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/create-user`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        toast.success('Signup successful!', { position: 'top-center', autoClose: 3000 });
        return { success: true, message: 'Signup successful' };
      } else {
        throw new Error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message, { position: 'top-center', autoClose: 3000 });
      return { success: false, message };
    }
  }, []);

  return { login, guestLogin, signup };
};