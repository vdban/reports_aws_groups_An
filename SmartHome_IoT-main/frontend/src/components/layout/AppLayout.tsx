import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Sidebar, NavPage } from '@/components/layout/Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const PATH_TO_PAGE: Record<string, NavPage> = {
  '/': 'overview',
  '/rooms': 'rooms',
  '/log': 'log',
  '/users': 'users',
  '/power': 'power',
};

const PAGE_TO_PATH: Record<NavPage, string> = {
  overview: '/',
  rooms: '/rooms',
  log: '/log',
  users: '/users',
  power: '/power',
};

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const currentPage = PATH_TO_PAGE[location.pathname] || 'overview';

  return (
    <div className="flex min-h-screen bg-slate-50 font-[Inter,sans-serif]">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(p) => navigate(PAGE_TO_PATH[p])}
        role={user.role}
        displayName={user.displayName}
        onLogout={logout}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
