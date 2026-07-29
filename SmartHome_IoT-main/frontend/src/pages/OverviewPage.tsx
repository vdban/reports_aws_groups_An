import { Home, Activity, AlertTriangle, Camera } from 'lucide-react';
import { PageHeader, StatCard, Badge } from '@/components/ui';
import { useHomeData } from '@/hooks/useHomeData';
import { useAuth } from '@/contexts/AuthContext';
import { DEVICE_ICON, statusBadge, statusLabel } from '@/types/home';

export function OverviewPage() {
  const { data, refresh } = useHomeData();
  const { user } = useAuth();

  if (!data) return <div className="text-gray-500">Đang tải...</div>;

  const { rooms, devices, sensors } = data;
  const running = devices.filter((d) => d.status === 'on');
  const errored = devices.filter((d) => d.status === 'error');
  const unknown = devices.filter((d) => d.status === 'unknown');
  const occupied = rooms.filter((r) => r.occupied);
  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <PageHeader title="Tổng Quan Hệ Thống" onRefresh={refresh} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Tổng thiết bị" value={devices.length} color="blue" />
        <StatCard label="Đang chạy" value={running.length} sub="màu vàng" color="yellow" />
        <StatCard label="Lỗi / Không nhận" value={errored.length + unknown.length} color="red" />
        <StatCard label="Phòng có người" value={`${occupied.length}/${rooms.length}`} color="green" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 flex flex-wrap gap-6">
        <div><span className="text-xs text-gray-500">Nhiệt độ IoT</span><p className="text-xl font-bold text-blue-700">{sensors.temperature}°C</p></div>
        <div><span className="text-xs text-gray-500">Độ ẩm</span><p className="text-xl font-bold text-blue-700">{sensors.humidity}%</p></div>
        <div><span className="text-xs text-gray-500">Ánh sáng LDR</span><p className="text-xl font-bold text-blue-700">{sensors.light}</p></div>
        <div className="text-xs text-gray-500 self-end">ESP32 · Đèn/Quạt/Cửa điều khiển thật</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {isAdmin && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Home size={16} className="text-blue-600" /> Tổng Quan Phòng</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((floor) => (
                <div key={floor}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Lầu {floor}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {rooms.filter((r) => r.floor === floor).map((room) => {
                      const rDevices = devices.filter((d) => d.roomId === room.id);
                      const rRunning = rDevices.filter((d) => d.status === 'on').length;
                      const rError = rDevices.filter((d) => d.status === 'error').length;
                      return (
                        <div key={room.id} className={`rounded border p-2 ${room.occupied ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-gray-800 truncate">{room.nameVi}</span>
                            {room.hasCamera && <Camera size={11} className="text-blue-500 flex-shrink-0" />}
                          </div>
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge color={room.occupied ? 'blue' : 'gray'}>{room.occupied ? 'Có người' : 'Trống'}</Badge>
                            {rRunning > 0 && <Badge color="yellow">{rRunning} đang chạy</Badge>}
                            {rError > 0 && <Badge color="red">{rError} lỗi</Badge>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`bg-white rounded-lg border border-gray-200 p-4 ${!isAdmin ? 'lg:col-span-2' : ''}`}>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Activity size={16} className="text-yellow-600" /> Thiết Bị Đang Chạy</h3>
          {running.length === 0 ? <p className="text-sm text-gray-400">Không có thiết bị nào đang chạy</p> : (
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {running.map((d) => {
                const room = rooms.find((r) => r.id === d.roomId);
                return (
                  <div key={d.id} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <span className="text-base">{DEVICE_ICON[d.type as keyof typeof DEVICE_ICON]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{d.name}</p>
                      <p className="text-xs text-gray-500">{room?.nameVi} · {d.runBy || 'auto'}{d.iotKey ? ' · IoT' : ''}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {d.temperature != null && <p className="text-xs font-mono text-blue-700">{d.temperature}°C</p>}
                      <p className="text-xs text-gray-400">{d.powerWatts}W</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {(errored.length > 0 || unknown.length > 0) && (
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2"><AlertTriangle size={16} /> Thiết Bị Cần Chú Ý</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[...errored, ...unknown].map((d) => {
              const room = rooms.find((r) => r.id === d.roomId);
              return (
                <div key={d.id} className={`flex items-center gap-2 p-2 rounded border ${d.status === 'error' ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-300'}`}>
                  <span className="text-base">{DEVICE_ICON[d.type as keyof typeof DEVICE_ICON]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{d.name}</p>
                    <p className="text-xs text-gray-500">{room?.nameVi}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge(d.status as 'on')}`}>{statusLabel(d.status as 'on')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
