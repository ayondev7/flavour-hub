import { create } from 'zustand';
import { getToken, removeToken, setToken as setSecureToken } from '../utils/token';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  setToken: async (token) => {
    await setSecureToken(token);
    set({ token, isAuthenticated: true });
  },
  logout: async () => {
    await removeToken();
    set({ user: null, token: null, isAuthenticated: false });
  },
  initialize: async () => {
    const token = await getToken();
    if (token) {
      set({ token, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));
