export type DeviceType =
  | 'light' | 'ac' | 'fan' | 'door' | 'tv' | 'fridge'
  | 'floor_cleaner' | 'camera' | 'stove' | 'washer' | 'irrigation' | 'dishwasher';

export type DeviceStatus = 'on' | 'off' | 'error' | 'unknown';

export interface Device {
  id: string;
  type: DeviceType;
  name: string;
  status: DeviceStatus;
  roomId: string;
  temperature?: number;
  fridgeLevel?: number;
  fridgeMode?: 'cold' | 'freeze';
  powerWatts: number;
  runBy?: string;
  iotKey?: string | null;
}

export interface Room {
  id: string;
  nameVi: string;
  floor: 1 | 2 | 3;
  hasCamera: boolean;
  occupied: boolean;
}

export interface LogEntry {
  id: string;
  deviceName: string;
  roomName: string;
  action: 'on' | 'off' | 'error';
  by: string;
  time: string;
}

export interface LoginRecord {
  username: string;
  role: 'admin' | 'user';
  loginTime: string;
  logoutTime?: string;
}

export interface HomeSnapshot {
  rooms: Room[];
  devices: Device[];
  logs: LogEntry[];
  loginHistory: LoginRecord[];
  sensors: { temperature: number; humidity: number; light: number };
  power: {
    daily: { t: string; kwh: number }[];
    weekly: { d: string; kwh: number }[];
    monthly: { d: string; curr: number; prev: number }[];
    wattsNow: number;
    runningCount: number;
  };
}

export const DEVICE_ICON: Record<DeviceType, string> = {
  light: '💡', ac: '❄️', fan: '🌀', door: '🚪', tv: '📺',
  fridge: '🧊', floor_cleaner: '🤖', camera: '📷', stove: '🔥',
  washer: '🫧', irrigation: '💧', dishwasher: '🍽️',
};

export function statusCard(s: DeviceStatus) {
  if (s === 'on') return 'bg-yellow-50 border-yellow-400 text-yellow-800';
  if (s === 'error') return 'bg-red-50 border-red-400 text-red-700';
  if (s === 'unknown') return 'bg-gray-100 border-gray-400 text-gray-500';
  return 'bg-white border-gray-200 text-gray-500';
}

export function statusBadge(s: DeviceStatus) {
  if (s === 'on') return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
  if (s === 'error') return 'bg-red-100 text-red-700 border border-red-400';
  if (s === 'unknown') return 'bg-gray-100 text-gray-500 border border-gray-300';
  return 'bg-gray-50 text-gray-500 border border-gray-200';
}

export function statusLabel(s: DeviceStatus) {
  if (s === 'on') return 'Đang chạy';
  if (s === 'error') return 'Lỗi';
  if (s === 'unknown') return 'Không nhận';
  return 'Tắt';
}
