import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-final-form'

import TextField from '@/components/TextField'
import { useChangePassword } from '@/api/useSession'

const ResetPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const { mutate: changePassword } = useChangePassword({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Password reset successful',
          description: "Your password has been updated. You'll now be redirected to the dashboard.",
        })
        setIsSubmitting(false)
        navigate('/dashboard')
      },

      onError: (error) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.error || 'An error occurred.',
          variant: 'destructive',
        })
        setIsSubmitting(false)
      },
    },
  })

  const handleResetPassword = async (values: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: 'Please ensure your new password and confirmation match.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await changePassword({
        old_password: values.oldPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.error || 'An error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Please reset your password to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleResetPassword}>
          {({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <TextField
                label="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="Enter your current password"
              />
              <TextField
                label="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
              />
              <TextField
                label="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
              />
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Reset Password'}
              </button>
            </form>
          )}
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <button
          onClick={() => navigate('/dashboard')}
          type="button"
          disabled={isSubmitting}
        >
          Skip for now
        </button>
      </CardFooter>
    </Card>
  )
}

export default ResetPasswordForm
