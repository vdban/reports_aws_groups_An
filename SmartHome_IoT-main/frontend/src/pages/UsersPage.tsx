import { useState, useEffect, useCallback } from 'react';
import { Shield, Users, Activity, Plus, Trash2, Edit2 } from 'lucide-react';
import { PageHeader, StatCard, Badge, Btn } from '@/components/ui';
import { useHomeData } from '@/hooks/useHomeData';
import { api, AuthUser } from '@/api/client';

export function UsersPage() {
  const { data, refresh } = useHomeData();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newPass, setNewPass] = useState('');

  const loadUsers = useCallback(async () => {
    const res = await api.listUsers();
    setUsers(res.users);
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const admins = users.filter((u) => u.role === 'admin');
  const regularUsers = users.filter((u) => u.role === 'user');
  const loginHistory = data?.loginHistory || [];

  async function handleAdd(role: 'admin' | 'user') {
    const id = Date.now().toString().slice(-4);
    const username = role === 'admin' ? `admin${id}` : `user${id}`;
    await api.addUser({ username, password: 'pass123', displayName: role === 'admin' ? 'Admin Mới' : 'Người Dùng Mới', role });
    await loadUsers();
  }

  async function handleDelete(username: string) {
    if (!confirm(`Xóa ${username}?`)) return;
    await api.deleteUser(username);
    await loadUsers();
  }

  async function handleSave(username: string) {
    await api.updateUser(username, {
      displayName: newName || undefined,
      password: newPass || undefined,
    });
    setEditId(null);
    setNewPass('');
    await loadUsers();
  }

  return (
    <div>
      <PageHeader title="Quản Lý Người Dùng" onRefresh={() => { refresh(); loadUsers(); }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Tổng tài khoản" value={users.length} color="blue" />
        <StatCard label="Admin" value={admins.length} color="red" />
        <StatCard label="Người dùng" value={regularUsers.length} color="green" />
        <StatCard label="Đang online" value={loginHistory.filter((l) => !l.logoutTime).length} color="yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <UserGroup title="Quản Trị Viên" color="red" icon={Shield} users={admins} editId={editId} setEditId={setEditId} newName={newName} setNewName={setNewName} newPass={newPass} setNewPass={setNewPass} onSave={handleSave} onDelete={handleDelete} suffix="" />
        <UserGroup title="Người Dùng" color="green" icon={Users} users={regularUsers} editId={editId} setEditId={setEditId} newName={newName} setNewName={setNewName} newPass={newPass} setNewPass={setNewPass} onSave={handleSave} onDelete={handleDelete} suffix="u" />
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Activity size={15} className="text-blue-600" /> Lịch Sử Đăng Nhập</h3>
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {loginHistory.map((l, i) => (
              <div key={i} className={`p-2 rounded border text-xs ${!l.logoutTime ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-gray-800">@{l.username}</span>
                  <Badge color={l.role === 'admin' ? 'red' : 'blue'}>{l.role === 'admin' ? 'Admin' : 'User'}</Badge>
                </div>
                <p className="text-gray-500">🔑 {l.loginTime}</p>
                {l.logoutTime ? <p className="text-gray-500">🚪 {l.logoutTime}</p> : <p className="text-green-600 font-medium">🟢 Đang online</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Btn sm color="red" onClick={() => handleAdd('admin')}><Plus size={12} className="inline mr-1" />Thêm Admin</Btn>
        <Btn sm color="green" onClick={() => handleAdd('user')}><Plus size={12} className="inline mr-1" />Thêm Người Dùng</Btn>
      </div>
    </div>
  );
}

function UserGroup({ title, color, icon: Icon, users, editId, setEditId, newName, setNewName, newPass, setNewPass, onSave, onDelete, suffix }: {
  title: string; color: string; icon: typeof Shield; users: AuthUser[];
  editId: string | null; setEditId: (id: string | null) => void;
  newName: string; setNewName: (v: string) => void; newPass: string; setNewPass: (v: string) => void;
  onSave: (u: string) => void; onDelete: (u: string) => void; suffix: string;
}) {
  const bg = color === 'red' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  const titleColor = color === 'red' ? 'text-red-700' : 'text-green-700';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className={`font-semibold ${titleColor} mb-3 flex items-center gap-2`}><Icon size={15} /> {title} ({users.length})</h3>
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.username} className={`p-2 rounded border ${bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{u.displayName}</p>
                <p className="text-xs text-gray-500">@{u.username}</p>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => { setEditId(u.username + suffix); setNewName(u.displayName); setNewPass(''); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"><Edit2 size={13} /></button>
                {u.username !== 'admin' && (
                  <button type="button" onClick={() => onDelete(u.username)} className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"><Trash2 size={13} /></button>
                )}
              </div>
            </div>
            {editId === u.username + suffix && (
              <div className="mt-2 space-y-1.5">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Tên hiển thị" className="w-full px-2 py-1 text-xs border rounded bg-white" />
                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Mật khẩu mới" className="w-full px-2 py-1 text-xs border rounded bg-white" />
                <div className="flex gap-1">
                  <Btn sm color="blue" onClick={() => onSave(u.username)}>Lưu</Btn>
                  <Btn sm color="gray" onClick={() => setEditId(null)}>Hủy</Btn>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
