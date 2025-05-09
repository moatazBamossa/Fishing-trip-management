import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Printer,
  BarChart3,
  User,
  HelpCircle
} from 'lucide-react';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out z-10`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center px-4 py-6 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed && (
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white mr-auto">
              Dashboard
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className={`${
              isCollapsed ? 'mx-auto' : 'ml-auto'
            } p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <SidebarItem
              icon={<Home />}
              text="Home"
              href="/"
              isCollapsed={isCollapsed}
              isActive={true}
            />
            <SidebarItem
              icon={<User />}
              text="users"
              href="/users"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<Printer />}
              text="profile"
              href="/profile"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={<BarChart3 />}
              text="Analytics"
              href="/analytics"
              isCollapsed={isCollapsed}
            />
          </ul>

          <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-800">
            <ul className="space-y-1">
              <SidebarItem
                icon={<Settings />}
                text="Settings"
                href="/settings"
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={<HelpCircle />}
                text="Help"
                href="/help"
                isCollapsed={isCollapsed}
              />
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              U
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  User Name
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  View Profile
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
