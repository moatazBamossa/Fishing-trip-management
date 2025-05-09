import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './navigation/Sidebar';
import Navbar from './navigation/Navbar';
import { cn } from '@/lib/utils';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} />

      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Navbar toggleSidebar={toggleSidebar} collapsed={sidebarCollapsed} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
