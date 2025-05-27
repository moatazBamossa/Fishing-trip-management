import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-final-form'

import TextField from '@/components/TextField'
import { useChangePassword } from '@/api/useSession'
import LoadingSVG from '@/components/ui/LoadingSVG'

const ResetPasswordForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { mutate: changePassword, isPending } = useChangePassword()

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

    changePassword(
      {
        old_password: values.oldPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Password reset successful',
            description:
              "Your password has been updated. You'll now be redirected to the dashboard.",
          })
          navigate('/dashboard')
        },
      },
    )
  }

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
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
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoadingSVG />
                    Processing...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm
