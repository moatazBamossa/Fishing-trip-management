import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <main className="w-full p-6 bg-white rounded-lg shadow-md">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
