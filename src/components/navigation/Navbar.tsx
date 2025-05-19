import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

interface NavbarProps {
  toggleSidebar: () => void
  collapsed: boolean
}

const Navbar = ({ toggleSidebar, collapsed }: NavbarProps) => {
  const isMobile = useIsMobile()

  return (
    <header className="h-16 border-b bg-white flex items-center px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="mr-4"
        aria-label={isMobile ? 'Open menu' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isMobile ? (
          <Menu className="h-5 w-5" />
        ) : collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
      <h1 className="text-xl font-semibold">Application</h1>
    </header>
  )
}

export default Navbar
