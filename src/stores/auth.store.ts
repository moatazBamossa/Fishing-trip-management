import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: number; // change this
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: 0,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        console.log('first', email, password);
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        const res = {
          json: async () => ({
            user: 1, // Mock user ID
            token: 'mock-token', // Mock token,
            isAuthenticated: true
          })
        };
        const { user, token, isAuthenticated } = await res.json();

        set({ user, token, isAuthenticated, isLoading: false });
      },

      logout: () => {
        set({ user: 0, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token })
    }
  )
);
