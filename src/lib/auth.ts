
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (credentials) => {
        const response = await api.auth.login(credentials);
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        });
        localStorage.setItem('token', response.token);
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
