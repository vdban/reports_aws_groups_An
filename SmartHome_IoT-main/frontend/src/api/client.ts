const API_BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('auth_token');
}

function getHeaders(auth = true): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(path: string, options: RequestInit = {}, auth = true): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...getHeaders(auth), ...options.headers },
    });
  } catch {
    throw new Error('Không kết nối được backend. Chạy backend (npm start trong thư mục backend) và mở app qua npm run dev.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error || 'Request failed');
  return data as T;
}

export interface AuthUser {
  username: string;
  displayName: string;
  role: string;
}

export interface HomeSnapshot {
  rooms: Array<{ id: string; nameVi: string; floor: number; hasCamera: boolean; occupied: boolean }>;
  devices: Array<{
    id: string; type: string; name: string; status: string; roomId: string;
    temperature?: number; fridgeLevel?: number; fridgeMode?: string;
    powerWatts: number; runBy?: string; iotKey?: string | null;
  }>;
  logs: Array<{ id: string; deviceName: string; roomName: string; action: string; by: string; time: string }>;
  loginHistory: Array<{ username: string; role: string; loginTime: string; logoutTime?: string }>;
  sensors: { temperature: number; humidity: number; light: number };
  power: {
    daily: { t: string; kwh: number }[];
    weekly: { d: string; kwh: number }[];
    monthly: { d: string; curr: number; prev: number }[];
    wattsNow: number;
    runningCount: number;
  };
}

export const api = {
  getAuthConfig: () =>
    request<{ cognitoEnabled: boolean; userPoolId: string | null; clientId: string | null }>(
      '/api/auth/config',
      {},
      false,
    ),

  getMe: () => request<{ success: boolean; user: AuthUser }>('/api/auth/me'),

  login: (username: string, password: string) =>
    request<{ success: boolean; token: string; user: AuthUser }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }, false),

  logout: () => request<{ success: boolean }>('/api/logout', { method: 'POST' }),

  getHome: () => request<HomeSnapshot>('/api/home'),

  toggleHomeDevice: (id: string) =>
    request<HomeSnapshot>(`/api/home/devices/${id}/toggle`, { method: 'POST' }),

  patchHomeDevice: (id: string, patch: Record<string, unknown>) =>
    request<HomeSnapshot>(`/api/home/devices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),

  listUsers: () =>
    request<{ success: boolean; users: AuthUser[] }>('/api/users'),

  addUser: (data: { username: string; password: string; displayName: string; role: string }) =>
    request<{ success: boolean; message: string }>('/api/users/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateUser: (username: string, data: { displayName?: string; password?: string; role?: string }) =>
    request<{ success: boolean; message: string }>(`/api/users/${username}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteUser: (username: string) =>
    request<{ success: boolean; message: string }>(`/api/users/delete/${username}`, {
      method: 'DELETE',
    }),
};

export function connectEvents(onEvent: (type: string) => void): () => void {
  const base = API_BASE || window.location.origin;
  const token = getToken();
  const url = token
    ? `${base}/api/events?token=${encodeURIComponent(token)}`
    : `${base}/api/events`;

  const es = new EventSource(url);
  ['sensors', 'light', 'fan', 'door', 'home'].forEach((evt) => {
    es.addEventListener(evt, () => onEvent(evt));
  });
  return () => es.close();
}
