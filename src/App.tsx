import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Layouts
import MainLayout from './components/layouts/MainLayout'
import AuthLayout from './components/layouts/AuthLayout'

// Pages
import Organization from './pages/Organization'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users/Users'
import Settings from './pages/Settings'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes (adjust as needed)
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      retry: 2,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login />}
            />
          </Route>

          {/* Main routes with sidebar */}
          <Route element={<MainLayout />}>
            <Route
              path="/organization"
              element={<Organization />}
            />
            <Route
              path="/organization/:id/users"
              element={<Users />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>

          {/* Redirect / to /dashboard */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* 404 page */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
