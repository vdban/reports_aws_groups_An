import { PageHeader, StatCard, Badge, Table } from '@/components/ui';
import { useHomeData } from '@/hooks/useHomeData';
import { LogEntry } from '@/types/home';
import { useState } from 'react';

export function LogPage() {
  const { data, refresh } = useHomeData();
  const [filter, setFilter] = useState('all');

  if (!data) return <div className="text-gray-500">Đang tải...</div>;

  const logs = data.logs;
  const filtered = filter === 'all' ? logs : logs.filter((l) => l.action === filter);

  return (
    <div>
      <PageHeader title="Nhật Ký Thiết Bị Trong Ngày" onRefresh={refresh}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="all">Tất cả</option>
          <option value="on">Bật</option>
          <option value="off">Tắt</option>
          <option value="error">Lỗi</option>
        </select>
      </PageHeader>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        <StatCard label="Tổng thao tác" value={logs.length} color="blue" />
        <StatCard label="Lần bật thiết bị" value={logs.filter((l) => l.action === 'on').length} color="yellow" />
        <StatCard label="Sự cố / Lỗi" value={logs.filter((l) => l.action === 'error').length} color="red" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200">
        <Table
          headers={['Thời gian', 'Thiết bị', 'Phòng', 'Hành động', 'Thực hiện bởi']}
          rows={filtered}
          renderRow={(row) => {
            const l = row as LogEntry;
            return (
              <tr key={l.id} className={`hover:bg-gray-50 ${l.action === 'error' ? 'bg-red-50' : ''}`}>
                <td className="px-3 py-2.5 text-xs font-mono text-gray-600 whitespace-nowrap">{l.time}</td>
                <td className="px-3 py-2.5 text-sm font-medium text-gray-800">{l.deviceName}</td>
                <td className="px-3 py-2.5 text-sm text-gray-600">{l.roomName}</td>
                <td className="px-3 py-2.5">
                  {l.action === 'on' && <Badge color="yellow">Bật</Badge>}
                  {l.action === 'off' && <Badge color="gray">Tắt</Badge>}
                  {l.action === 'error' && <Badge color="red">⚠ Lỗi</Badge>}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600">{l.by}</td>
              </tr>
            );
          }}
        />
      </div>
    </div>
  );
}
