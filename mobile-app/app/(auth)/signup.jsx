import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { userRoutes } from '../../routes/userRoutes';
import { User, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const schema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
}).required();

export default function Signup() {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response = await axios.post(userRoutes.createUser, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      alert('Account created successfully! Please login.');
      router.replace('/(auth)/login');
    },
    onError: (error) => {
      console.error('Signup failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="items-center mb-8">
            <Text className="text-4xl font-bold text-dark mb-2">Create Account</Text>
            <Text className="text-gray text-lg">Join our community of chefs!</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-dark font-medium mb-2 ml-1">Username</Text>
              <View className="flex-row items-center bg-light rounded-2xl px-4 py-3 border border-gray/20 focus:border-primary">
                <User color="#A0AEC0" size={20} />
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-3 text-dark text-base"
                      placeholder="Choose a username"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                    />
                  )}
                />
              </View>
              {errors.username && <Text className="text-red-500 text-sm ml-1 mt-1">{errors.username.message}</Text>}
            </View>

            <View>
              <Text className="text-dark font-medium mb-2 ml-1">Email</Text>
              <View className="flex-row items-center bg-light rounded-2xl px-4 py-3 border border-gray/20 focus:border-primary">
                <Mail color="#A0AEC0" size={20} />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-3 text-dark text-base"
                      placeholder="Enter your email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
              </View>
              {errors.email && <Text className="text-red-500 text-sm ml-1 mt-1">{errors.email.message}</Text>}
            </View>

            <View>
              <Text className="text-dark font-medium mb-2 ml-1">Password</Text>
              <View className="flex-row items-center bg-light rounded-2xl px-4 py-3 border border-gray/20 focus:border-primary">
                <Lock color="#A0AEC0" size={20} />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-3 text-dark text-base"
                      placeholder="Create a password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                    />
                  )}
                />
              </View>
              {errors.password && <Text className="text-red-500 text-sm ml-1 mt-1">{errors.password.message}</Text>}
            </View>

            <View>
              <Text className="text-dark font-medium mb-2 ml-1">Confirm Password</Text>
              <View className="flex-row items-center bg-light rounded-2xl px-4 py-3 border border-gray/20 focus:border-primary">
                <Lock color="#A0AEC0" size={20} />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-3 text-dark text-base"
                      placeholder="Confirm your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                    />
                  )}
                />
              </View>
              {errors.confirmPassword && <Text className="text-red-500 text-sm ml-1 mt-1">{errors.confirmPassword.message}</Text>}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={signupMutation.isPending}
              className={`bg-primary p-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 mt-4 ${signupMutation.isPending ? 'opacity-70' : ''}`}
            >
              <Text className="text-white font-bold text-lg mr-2">
                {signupMutation.isPending ? 'Creating Account...' : 'Sign Up'}
              </Text>
              {!signupMutation.isPending && <ArrowRight color="white" size={20} />}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray text-base">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-primary font-bold text-base">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
