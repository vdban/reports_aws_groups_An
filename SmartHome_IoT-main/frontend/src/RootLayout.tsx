import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { LoginFlow } from '@/components/auth/LoginFlow';
import { AppLayout } from '@/components/layout/AppLayout';

export function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-gray-500 font-[Inter,sans-serif]">
        Đang tải...
      </div>
    );
  }

  if (!user) return <LoginFlow />;

  return <AppLayout />;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}
