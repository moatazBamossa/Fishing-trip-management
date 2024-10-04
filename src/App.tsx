import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import Names from './lib/Names/Names';
import Operations from './lib/Operations/Operations';
import Steps from './lib/Steps/Steps';
import Login from './lib/Login';
import ProtectedRoute from './ProtectedRoute';

// Create a client outside of the App component
const queryClient = new QueryClient();

const App = () => {
  // const { data: isAuthenticated, isLoading, error } = useGetAuth();

  return (
    <NextUIProvider
      style={{
        direction: 'rtl'
      }}
      className="hero"
    >
      <Router>
        <Routes>
          {/* Public Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Names />
              </ProtectedRoute>
            }
          />
          <Route
            path="/steps/:id"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Steps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/:id"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Operations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </NextUIProvider>
  );
};

// Wrap the App component with QueryClientProvider
const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default AppWrapper;
