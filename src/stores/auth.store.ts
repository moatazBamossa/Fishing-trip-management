import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: {
    name: string;
    email: string;
    isresetPassword: boolean;
  } | null; // change this
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        console.log('first', email, password);
        set({ isLoading: true });
        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        // const res = {
        //   json: async () => ({
        //     user: {
        //       name: 'moataz',
        //       email: 'm@gmail.com',
        //       isresetPassword: true
        //     }, // Mock user ID
        //     token: 'mock-token', // Mock token,
        //     isAuthenticated: true
        //   })
        // };
        // const { user, token, isAuthenticated } = await res.json();

        // set({ user, token, isAuthenticated, isLoading: false });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token })
    }
  )
);
