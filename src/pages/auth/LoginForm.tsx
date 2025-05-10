import TextField from '@/components/TextField';

import { useAuthStore } from '@/stores/auth.store';

import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './ResetPassword';

type SubmitType = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const { login, isLoading, user, isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = (values: SubmitType) => {
    login(values.email, values.password);
  };

  if (isAuthenticated && user?.isresetPassword) {
    return <ResetPasswordForm />;
  }
  if (isAuthenticated && !user?.isresetPassword) {
    navigate('/dashboard');
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }): JSX.Element => (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <TextField
            label="Email"
            type="email"
            name="email"
            placeholder="your.name@example.com"
          />

          <TextField type="password" label="password" name="password" />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
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
  );
};

export default LoginForm;
