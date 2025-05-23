import { login, UserType } from '@/api/useSession'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from '@/components/ui/use-toast'
import { saveUserSecureData } from '@/lib/utils'

type AuthState = {
  user: UserType | null // change this
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await login({ email, password })
          toast({
            title: 'Login successfully',
            description: 'login successfully',
          })
          const { token, user } = res
          set({ user, token, isAuthenticated: !!user.id, isLoading: false })
          localStorage.setItem('token', token)
        } catch (error) {
          console.log('error', error)
          toast({
            title: 'Login Failed',
            description: error?.response?.data?.error || 'Invalid credentials.',
            variant: 'destructive',
          })
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem('token')
        toast({
          title: 'Logout successfully',
          description: 'You have been logged out.',
          variant: 'default',
        })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) =>
        saveUserSecureData(
          {
            token: state.token,
            isAdmin: state?.user.is_admin ?? false,
            isSuperAdmin: state?.user?.role === 'super_admin',
          },
          'secureUserData',
        ),
    },
  ),
)
