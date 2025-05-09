import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { Loader } from 'lucide-react';

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
