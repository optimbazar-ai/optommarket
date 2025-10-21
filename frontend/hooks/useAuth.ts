import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/users/profile');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, phone?: string, address?: string) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/users/register', { 
        username, 
        email, 
        password,
        phone,
        address
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return { user, loading, login, register, logout, isAuthenticated: !!user };
};
