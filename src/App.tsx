import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/Layout/AuthLayout';
import MainLayout from './components/Layout/MainLayout';

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
const Users = () => <>Users</>;
const Settings = () => <>Settings</>;
const NotFound = () => <>NotFound</>;
// const Reports = () => <>Reports</>;
// const AuditLogs = () => <>AuditLogs</>;
// const Help = () => <>Help</>;

// const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Main routes with sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Redirect / to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
