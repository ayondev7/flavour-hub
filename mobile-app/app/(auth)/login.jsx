import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { userRoutes } from '../../routes/userRoutes';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

export default function Login() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(userRoutes.loginUser, data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        router.replace('/(tabs)/home');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="items-center mb-10">
            <Text className="text-4xl font-bold text-dark mb-2">Welcome Back!</Text>
            <Text className="text-gray text-lg">Please sign in to your account</Text>
          </View>

          <View className="space-y-4">
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
                      placeholder="Enter your password"
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

            <TouchableOpacity className="items-end">
              <Text className="text-primary font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loginMutation.isPending}
              className={`bg-primary p-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 mt-4 ${loginMutation.isPending ? 'opacity-70' : ''}`}
            >
              <Text className="text-white font-bold text-lg mr-2">
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </Text>
              {!loginMutation.isPending && <ArrowRight color="white" size={20} />}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray text-base">Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text className="text-primary font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
