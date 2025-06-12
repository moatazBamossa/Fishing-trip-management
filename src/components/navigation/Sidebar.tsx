import { NavLink } from 'react-router-dom'
import { cn, getUserSecureData } from '@/lib/utils'
import {
  Home,
  LayoutDashboard,
  Users,
  Settings,
  Sailboat,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

interface SidebarProps {
  collapsed: boolean
  toggleSidebar: () => void
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  collapsed,
  onClick,
}: {
  to: string
  icon: React.ElementType
  label: string
  collapsed: boolean
  onClick?: () => void
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
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
const Sidebar = (props: SidebarProps) => {
  const { collapsed } = props
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
        <div className="flex justify-between items-center w-full">
          <span
            className={cn(
              'text-xl font-bold transition-all duration-300',
              collapsed ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100',
            )}
          >
            App Name
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={props.toggleSidebar}
            className="mr-4"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <div className="flex flex-col justify-between h-full">
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
          <div className="flex flex-col space-y-1 mt-4">
            <NavItem
              to="/login"
              icon={LogOut}
              label="logout"
              collapsed={collapsed}
              onClick={() => {
                localStorage.removeItem('secureUserData')
                localStorage.removeItem('auth-storage')
                localStorage.removeItem('token')
              }}
            />
            <div className="flex gap-2">
              <div
                className={cn(
                  collapsed ? 'flex flex-col items-center' : 'flex items-center space-x-4 pl-4',
                )}
              >
                <Avatar className={cn(collapsed ? 'h-6 w-6' : 'fh-8 w-9')}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-[10px] font-medium text-gray-900 ">John Doe</div>
                  <div className="text-[8px] text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
