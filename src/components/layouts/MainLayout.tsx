import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../navigation/Sidebar'
import Navbar from '../navigation/Navbar'
import { cn } from '@/lib/utils'

const MainLayout = () => {
  const isMobile = window.innerWidth <= 768
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile)

  const isAuthentication = localStorage.getItem('token')

  if (!isAuthentication) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  return (
    <div className="min-h-screen flex bg-white">
      <div
        className={cn(
          'fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          collapsed={sidebarCollapsed}
        />
      </div>

      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'ml-16' : 'ml-64',
        )}
      >
        <Navbar />
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
