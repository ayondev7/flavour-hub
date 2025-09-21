import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthService } from './useAuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
}).required();

/**
 * Custom hook for signup form logic.
 * @returns {Object} - Form methods and handlers.
 */
export const useSignupForm = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthService();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (image) formData.append('image', image);

    const result = await signup(formData);
    if (result.success) {
      await checkAuth();
      setTimeout(() => navigate('/user-home'), 3000);
    }
    setIsLoading(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 3 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, JPG, PNG, or WEBP formats are allowed');
      return;
    }

    if (file.size > maxSize) {
      alert('Image size must be 3MB or less');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImage(file);
    setValue('image', file); // Set in form if needed
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    image,
    previewUrl,
    isLoading,
    handleFileSelect,
  };
};