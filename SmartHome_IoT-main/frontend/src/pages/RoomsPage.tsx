import { useState } from 'react';
import { Power } from 'lucide-react';
import { PageHeader, Badge } from '@/components/ui';
import { useHomeData } from '@/hooks/useHomeData';
import { useAuth } from '@/contexts/AuthContext';
import { DEVICE_ICON, statusBadge, statusLabel, statusCard, Device } from '@/types/home';

function DeviceCard({ device, onToggle, onPatch }: {
  device: Device;
  onToggle: (id: string) => void;
  onPatch: (id: string, patch: Record<string, unknown>) => void;
}) {
  const canToggle = device.status !== 'error' && device.status !== 'unknown';

  return (
    <div className={`rounded-lg border p-3 ${statusCard(device.status)}`}>
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{DEVICE_ICON[device.type]}</span>
          <div>
            <p className="text-sm font-semibold">{device.name}</p>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusBadge(device.status)}`}>{statusLabel(device.status)}</span>
            {device.iotKey && <span className="ml-1 text-xs text-blue-600">IoT</span>}
          </div>
        </div>
        {canToggle && (
          <button type="button" onClick={() => onToggle(device.id)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${device.status === 'on' ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200 hover:bg-gray-300'}`}>
            <Power size={13} />
          </button>
        )}
      </div>
      <div className="text-xs space-y-0.5 opacity-80">
        {device.temperature != null && <p>🌡 {device.temperature}°C</p>}
        {device.fridgeMode && <p>❄ {device.fridgeMode === 'cold' ? 'Lạnh' : 'Đông'} · Mức {device.fridgeLevel}/5</p>}
        <p>⚡ {device.powerWatts}W</p>
        {device.runBy && <p>👤 {device.runBy}</p>}
      </div>
      {device.type === 'ac' && device.status === 'on' && !device.iotKey && (
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={() => onPatch(device.id, { temperature: Math.max(16, (device.temperature || 24) - 1) })} className="w-7 h-7 rounded bg-blue-100 text-blue-700 font-bold cursor-pointer">−</button>
          <button type="button" onClick={() => onPatch(device.id, { temperature: Math.min(30, (device.temperature || 24) + 1) })} className="w-7 h-7 rounded bg-red-100 text-red-700 font-bold cursor-pointer">+</button>
        </div>
      )}
    </div>
  );
}

function RoomDetail({ room, roomDevices, onToggle, onPatch, userMode }: {
  room?: { id: string; nameVi: string; floor: number; hasCamera: boolean; occupied: boolean };
  roomDevices: Device[];
  onToggle: (id: string) => void;
  onPatch: (id: string, patch: Record<string, unknown>) => void;
  userMode?: boolean;
}) {
  if (!room) return <p className="text-gray-500">Chọn một phòng.</p>;

  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-bold text-gray-900 text-base">{room.nameVi}</h3>
          <div className="flex gap-2">
            <Badge color={room.occupied ? 'blue' : 'gray'}>{room.occupied ? 'Có người' : 'Trống'}</Badge>
            {room.hasCamera && <Badge color="blue">Có Camera 📷</Badge>}
            <Badge color="gray">Lầu {room.floor}</Badge>
          </div>
        </div>
        {room.hasCamera && !userMode && (
          <div className="mb-3 rounded-lg overflow-hidden border border-gray-300 bg-gray-900 h-36 flex items-center justify-center relative">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=200&fit=crop&auto=format" alt="Camera" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
            </div>
          </div>
        )}
        <p className="text-xs text-gray-500">
          {roomDevices.length} thiết bị · {roomDevices.filter((d) => d.status === 'on').length} đang chạy
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roomDevices.map((d) => (
          <DeviceCard key={d.id} device={d} onToggle={onToggle} onPatch={onPatch} />
        ))}
      </div>
    </div>
  );
}

export function RoomsPage() {
  const { data, refresh, toggleDevice, patchDevice } = useHomeData();
  const { user } = useAuth();
  const [selRoom, setSelRoom] = useState('');

  if (!data) return <div className="text-gray-500">Đang tải...</div>;

  const { rooms, devices } = data;
  const isAdmin = user?.role === 'admin';
  const activeRoom = selRoom || rooms[0]?.id || '';
  const room = rooms.find((r) => r.id === activeRoom);
  const roomDevices = devices.filter((d) => d.roomId === activeRoom) as Device[];

  return (
    <div>
      <PageHeader title={isAdmin ? 'Quản Lý Phòng' : 'Điều Khiển Thiết Bị'} onRefresh={refresh} />

      {isAdmin ? (
        <div className="flex gap-5">
          <div className="w-52 flex-shrink-0">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chọn phòng</p>
            {[1, 2, 3].map((floor) => (
              <div key={floor} className="mb-3">
                <p className="text-xs text-gray-400 font-semibold mb-1 pl-1">Lầu {floor}</p>
                {rooms.filter((r) => r.floor === floor).map((r) => (
                  <button key={r.id} type="button" onClick={() => setSelRoom(r.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm mb-1 transition-colors cursor-pointer ${activeRoom === r.id ? 'bg-blue-600 text-white font-semibold' : 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50'}`}>
                    {r.nameVi}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <RoomDetail room={room} roomDevices={roomDevices} onToggle={toggleDevice} onPatch={patchDevice} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {rooms.map((r) => (
              <button key={r.id} type="button" onClick={() => setSelRoom(r.id)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors border cursor-pointer ${activeRoom === r.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}>
                {r.nameVi} <span className="text-xs opacity-70">(L{r.floor})</span>
              </button>
            ))}
          </div>
          <RoomDetail room={room} roomDevices={roomDevices} onToggle={toggleDevice} onPatch={patchDevice} userMode />
        </>
      )}
    </div>
  );
}
