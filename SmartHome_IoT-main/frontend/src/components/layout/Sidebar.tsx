import { BarChart2, ChevronRight, Home, LogOut, Menu, Users, Zap, Activity } from 'lucide-react';

export type NavPage = 'overview' | 'rooms' | 'log' | 'users' | 'power';

const ADMIN_NAV: { page: NavPage; label: string; icon: typeof Home }[] = [
  { page: 'overview', label: 'Tổng Quan', icon: BarChart2 },
  { page: 'rooms', label: 'Quản Lý Phòng', icon: Home },
  { page: 'log', label: 'Nhật Ký Ngày', icon: Activity },
  { page: 'users', label: 'Người Dùng', icon: Users },
  { page: 'power', label: 'Điện Tiêu Thụ', icon: Zap },
];

const USER_NAV: { page: NavPage; label: string; icon: typeof Home }[] = [
  { page: 'overview', label: 'Tổng Quan', icon: BarChart2 },
  { page: 'rooms', label: 'Điều Khiển', icon: Home },
  { page: 'power', label: 'Điện Tiêu Thụ', icon: Zap },
];

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (p: NavPage) => void;
  role: string;
  displayName: string;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentPage, onNavigate, role, displayName, onLogout, collapsed, onToggle }: SidebarProps) {
  const nav = role === 'admin' ? ADMIN_NAV : USER_NAV;

  return (
    <aside className={`${collapsed ? 'w-14' : 'w-56'} bg-blue-900 text-white flex flex-col flex-shrink-0 transition-all duration-200 min-h-screen`}>
      <div className="flex items-center justify-between p-3 border-b border-blue-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xl">🏠</span>
            <span className="font-bold text-sm">SmartHome</span>
          </div>
        )}
        <button type="button" onClick={onToggle} className="p-1 rounded hover:bg-blue-800 transition-colors ml-auto cursor-pointer">
          <Menu size={18} />
        </button>
      </div>
      {!collapsed && (
        <div className="px-3 py-2.5 border-b border-blue-800">
          <div className="text-xs text-blue-300 font-medium">{role === 'admin' ? 'QUẢN TRỊ VIÊN' : 'NGƯỜI DÙNG'}</div>
          <div className="text-sm font-semibold truncate mt-0.5">{displayName}</div>
        </div>
      )}
      <nav className="flex-1 py-2">
        {nav.map(({ page, label, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors cursor-pointer ${active ? 'bg-blue-700 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && active && <ChevronRight size={14} className="ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </nav>
      <button type="button" onClick={onLogout} className="flex items-center gap-3 px-3 py-3 text-blue-300 hover:bg-blue-800 hover:text-white transition-colors border-t border-blue-800 text-sm cursor-pointer">
        <LogOut size={17} className="flex-shrink-0" />
        {!collapsed && <span>Đăng Xuất</span>}
      </button>
    </aside>
  );
}
