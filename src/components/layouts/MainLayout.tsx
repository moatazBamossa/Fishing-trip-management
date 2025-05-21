import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../navigation/Sidebar'
import Navbar from '../navigation/Navbar'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useAuthStore } from '@/stores/auth.store'

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useIsMobile()

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
    if (isMobile) {
      setMobileOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {isMobile ? (
        <>
          <Drawer
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          >
            <DrawerContent className="h-[85%] max-h-[85%]">
              <div className="h-full overflow-y-auto">
                <Sidebar collapsed={false} />
              </div>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <div
          className={cn(
            'fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out',
            sidebarCollapsed ? 'w-16' : 'w-64',
          )}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </div>
      )}

      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64',
        )}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
