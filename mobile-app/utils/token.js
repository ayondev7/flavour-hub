import * as SecureStore from 'expo-secure-store';

export const setToken = async (token) => {
  await SecureStore.setItemAsync('accessToken', token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('accessToken');
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('accessToken');
};

export const setRefreshToken = async (token) => {
  await SecureStore.setItemAsync('refreshToken', token);
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync('refreshToken');
};

export const removeRefreshToken = async () => {
  await SecureStore.deleteItemAsync('refreshToken');
};
