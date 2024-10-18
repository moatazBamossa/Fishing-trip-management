import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import Names from './lib/Names/Names';
import Operations from './lib/Operations/Operations';
import Steps from './lib/Steps/Steps';
import Login from './lib/Login';
import ProtectedRoute from './ProtectedRoute';
import Details from './lib/Details';
import { useCalculationStore } from './lib/storge/createCalcuateSlice';

// Create a client outside of the App component
const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useCalculationStore();

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
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Names />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Details />
              </ProtectedRoute>
            }
          />
          <Route
            path="/steps/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Steps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
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
