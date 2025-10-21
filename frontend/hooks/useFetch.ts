import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

export const useFetch = <T,>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<T>(url);
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...deps]);

  return { data, loading, error, refetch: () => setLoading(true) };
};
