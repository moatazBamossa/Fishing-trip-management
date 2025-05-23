import TextField from '@/components/TextField'

import { useAuthStore } from '@/stores/auth.store'

import { Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import LoadingSVG from '@/components/ui/LoadingSVG'
import { useEffect } from 'react'

type SubmitType = {
  email: string
  password: string
}
const LoginForm = () => {
  const { toast } = useToast()

  const { login, isLoading, user, isAuthenticated } = useAuthStore()

  const navigate = useNavigate()

  const onSubmit = (values: SubmitType) => {
    login(values.email, values.password)
  }

  useEffect(() => {
    if (isAuthenticated && !user?.reset_required) {
      window.location.href = '/dashboard'
      toast({
        title: 'Log in successfully',
        description: 'You are logged in',
        variant: 'default',
      })
    }
  }, [isAuthenticated, user, navigate, toast])

  if (isAuthenticated && user?.reset_required) {
    return (window.location.href = '/password')
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }): JSX.Element => (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            placeholder="your.name@example.com"
          />

          <TextField
            type="password"
            label="password"
            name="password"
          />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingSVG />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      )}
    </Form>
  )
}

export default LoginForm
