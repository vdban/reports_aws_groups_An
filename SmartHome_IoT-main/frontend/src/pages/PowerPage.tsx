import { useState } from 'react';
import { Download, Zap } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { PageHeader, StatCard } from '@/components/ui';
import { useHomeData } from '@/hooks/useHomeData';
import { useAuth } from '@/contexts/AuthContext';

export function PowerPage() {
  const { data, refresh } = useHomeData();
  const { user } = useAuth();
  const [tab, setTab] = useState<'day' | 'week' | 'month'>('day');
  const isAdmin = user?.role === 'admin';

  if (!data) return <div className="text-gray-500">Đang tải...</div>;

  const { power } = data;
  const totalDay = power.daily.reduce((s, d) => s + d.kwh, 0).toFixed(1);
  const totalMonth = power.monthly.reduce((s, d) => s + d.curr, 0).toFixed(0);
  const prevMonth = power.monthly.reduce((s, d) => s + d.prev, 0).toFixed(0);
  const tier1 = Math.min(+totalMonth, 50) * 1.89;
  const tier2 = Math.max(0, Math.min(+totalMonth - 50, 50)) * 1.99;
  const tier3 = Math.max(0, Math.min(+totalMonth - 100, 100)) * 2.79;
  const tier4 = Math.max(0, +totalMonth - 200) * 3.15;
  const totalCost = (tier1 + tier2 + tier3 + tier4).toFixed(0);

  return (
    <div>
      <PageHeader title={isAdmin ? 'Tổng Hợp Điện Tiêu Thụ' : 'Báo Cáo Điện Tiêu Thụ'} onRefresh={refresh}>
        {isAdmin && (
          <button type="button" onClick={() => alert('Xuất PDF — demo')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer">
            <Download size={14} />Xuất PDF
          </button>
        )}
      </PageHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard label="Hôm nay" value={`${totalDay} kWh`} color="blue" />
        <StatCard label="Tháng này" value={`${totalMonth} kWh`} color="yellow" />
        <StatCard label="Tháng trước" value={`${prevMonth} kWh`} sub={+totalMonth > +prevMonth ? '▲ Tăng hơn' : '▼ Giảm hơn'} color={+totalMonth > +prevMonth ? 'red' : 'green'} />
        <StatCard label="Đang tiêu thụ" value={`${power.wattsNow}W`} sub={`${power.runningCount} thiết bị bật`} color="gray" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-5">
        <div className="flex items-center gap-2 mb-4">
          {(['day', 'week', 'month'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t === 'day' ? 'Trong ngày' : t === 'week' ? 'Trong tuần' : 'Trong tháng'}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={240}>
          {tab === 'day' ? (
            <AreaChart data={power.daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="t" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit=" kWh" />
              <Tooltip formatter={(v: number) => [`${v} kWh`, 'Tiêu thụ']} />
              <Area type="monotone" dataKey="kwh" stroke="#1d4ed8" fill="#dbeafe" strokeWidth={2} />
            </AreaChart>
          ) : tab === 'week' ? (
            <BarChart data={power.weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="d" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit=" kWh" />
              <Tooltip formatter={(v: number) => [`${v} kWh`, 'Tiêu thụ']} />
              <Bar dataKey="kwh" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={power.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="d" tick={{ fontSize: 9 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} unit=" kWh" />
              <Tooltip formatter={(v: number) => [`${v} kWh`]} />
              <Legend />
              <Line type="monotone" dataKey="curr" stroke="#1d4ed8" strokeWidth={2} dot={false} name="Tháng này" />
              <Line type="monotone" dataKey="prev" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Tháng trước" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {isAdmin && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Zap size={15} className="text-yellow-500" /> Bậc Tính Tiền Điện (EVN)</h3>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-800">Tổng ước tính tháng này:</p>
            <p className="text-xl font-bold text-blue-700">{Number(totalCost).toLocaleString('vi-VN')}k₫</p>
          </div>
        </div>
      )}
    </div>
  );
}
