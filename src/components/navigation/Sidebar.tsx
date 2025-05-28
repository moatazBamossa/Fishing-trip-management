import { NavLink } from 'react-router-dom'
import { cn, getUserSecureData } from '@/lib/utils'
import { Home, LayoutDashboard, Users, Settings, Sailboat } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  collapsed,
}: {
  to: string
  icon: React.ElementType
  label: string
  collapsed: boolean
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center px-4 py-3 my-1 rounded-md transition-all duration-200',
          'hover:bg-gray-100 group transform hover:translate-x-1',
          isActive ? 'bg-gray-100 text-primary' : 'text-gray-700',
        )
      }
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', collapsed ? 'mr-0' : 'mr-3')} />
      {!collapsed && (
        <span
          className={cn(
            'text-sm font-medium transition-opacity duration-200',
            collapsed ? 'opacity-0 w-0' : 'opacity-100',
          )}
        >
          {label}
        </span>
      )}
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
  )
}

const sidebarItems = ({ isAdmin, isSuperAdmin }) =>
  [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/boats', icon: Sailboat, label: 'Boats' },
    isSuperAdmin && { to: '/organization', icon: Home, label: 'Organization' },
    isAdmin && { to: '/users', icon: Users, label: 'Users' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ].filter(Boolean)
const Sidebar = ({ collapsed }: SidebarProps) => {
  const { isAdmin, isSuperAdmin } = getUserSecureData('secureUserData')

  return (
    <aside
      className={cn(
        'bg-white border-r h-screen fixed left-0 top-0 z-30',
        'flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="h-16 border-b flex items-center px-4">
        <span
          className={cn(
            'text-xl font-bold transition-all duration-300',
            collapsed ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100',
          )}
        >
          App Name
        </span>
      </div>

      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <div className="space-y-1 animate-fade-in">
          {sidebarItems({
            isAdmin: isAdmin || false,
            isSuperAdmin: isSuperAdmin || false,
          }).map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
