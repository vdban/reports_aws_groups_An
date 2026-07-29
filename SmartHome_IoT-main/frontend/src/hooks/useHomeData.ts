import { useState, useEffect, useCallback } from 'react';
import { api, connectEvents, HomeSnapshot } from '@/api/client';

export function useHomeData() {
  const [data, setData] = useState<HomeSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setData(await api.getHome());
      setLoading(false);
    } catch (err) {
      console.error('Failed to load home data:', err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const disconnect = connectEvents((type) => {
      if (['home', 'light', 'fan', 'door', 'sensors'].includes(type)) refresh();
    });
    const interval = setInterval(refresh, 8000);
    return () => {
      disconnect();
      clearInterval(interval);
    };
  }, [refresh]);

  const toggleDevice = async (id: string) => {
    setData(await api.toggleHomeDevice(id));
  };

  const patchDevice = async (id: string, patch: Record<string, unknown>) => {
    setData(await api.patchHomeDevice(id, patch));
  };

  return { data, loading, refresh, toggleDevice, patchDevice };
}
