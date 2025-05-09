import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  collapsed
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center px-4 py-3 my-1 rounded-md transition-colors relative',
          'hover:bg-gray-100 group',
          isActive ? 'bg-gray-100 text-primary' : 'text-gray-700'
        )
      }
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
      {collapsed && (
        <div
          className="
          absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs
          rounded opacity-0 group-hover:opacity-100 transition-opacity
          pointer-events-none whitespace-nowrap z-50
        "
        >
          {label}
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'bg-white border-r h-screen fixed left-0 top-0 z-30',
        'flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="h-16 border-b flex items-center px-4">
        <span
          className={cn(
            'text-xl font-bold transition-opacity duration-300',
            collapsed ? 'opacity-0' : 'opacity-100'
          )}
        >
          App Name
        </span>
      </div>

      <nav className="flex-1 py-4 px-2">
        <NavItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          collapsed={collapsed}
        />
        <NavItem to="/users" icon={Users} label="Users" collapsed={collapsed} />
        <NavItem
          to="/settings"
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
