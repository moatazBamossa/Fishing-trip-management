import React from 'react'
import LoginForm from './LoginForm'

// import Logo from '../../assets/react.svg';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="px-6 sm:px-8 pt-8 pb-6">
            <div className="flex flex-col items-center mb-8">
              {/* <Logo /> */}
              <div>LOGO</div>
              <h1 className="mt-6 text-2xl font-semibold text-gray-900">Welcome to iMazing</h1>
              <p className="mt-2 text-center text-gray-600">Sign in to manage your Apple devices</p>
            </div>

            <LoginForm />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} iMazing. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
