import React from 'react';
import { useNavigate } from 'react-router';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  href,
  isCollapsed,
  isActive = false
}) => {
  const navigate = useNavigate();
  return (
    <li>
      <button
        onClick={() => navigate(href)}
        className={`
          flex items-center px-4 py-3 text-gray-700 dark:text-gray-300
          ${
            isActive
              ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }
          rounded-lg transition-colors duration-200
        `}
      >
        <div className={`${isCollapsed ? 'mx-auto' : ''}`}>
          <div
            className={`h-5 w-5 ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}
          >
            {icon}
          </div>
        </div>
        {!isCollapsed && <span className="ml-3">{text}</span>}
      </button>
    </li>
  );
};

export default SidebarItem;
