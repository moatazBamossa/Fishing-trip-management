import { lazy } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/Layout/ProtectedRoute';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/Login'));
// const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
// const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
// const Users = lazy(() => import('./pages/users/Users'));
// const Settings = lazy(() => import('./pages/settings/Settings'));
// const Profile = lazy(() => import('./pages/profile/Profile'));
// const Reports = lazy(() => import('./pages/reports/Reports'));
// const AuditLogs = lazy(() => import('./pages/audit/AuditLogs'));
// const Help = lazy(() => import('./pages/help/Help'));
// const LoginPage = () => <>LoginPage</>;
// const DashboardLayout = () => <>DashboardLayout</>;
const Dashboard = () => <>Dashboard</>;

// const Reports = () => <>Reports</>;
// const AuditLogs = () => <>AuditLogs</>;
// const Help = () => <>Help</>;

// const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/users" element={<div>users</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
