'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/constants';
import toast from 'react-hot-toast';

interface Order {
  id: number;
  user_id: number;
  username: string;
  email: string;
  total_amount: string;
  status: string;
  created_at: string;
  items_count: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Buyurtmalarni olishda xatolik');

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Orders error:', error);
      toast.error('Buyurtmalarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Status o\'zgartirishda xatolik');

      const data = await response.json();
      toast.success(data.message);
      fetchOrders();
    } catch (error) {
      console.error('Status change error:', error);
      toast.error('Status o\'zgartirishda xatolik');
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    shipped: 'bg-purple-100 text-purple-800 border-purple-300',
    delivered: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  const statusNames: { [key: string]: string } = {
    pending: 'Kutilmoqda',
    confirmed: 'Tasdiqlangan',
    shipped: 'Yo\'lda',
    delivered: 'Yetkazilgan',
    cancelled: 'Bekor qilingan',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">🛒 Buyurtmalar Boshqaruvi</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Barchasi ({orders.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Kutilmoqda ({orders.filter(o => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Tasdiqlangan ({orders.filter(o => o.status === 'confirmed').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foydalanuvchi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Summa</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mahsulotlar</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sana</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.email}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">${order.total_amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.items_count} ta</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[order.status]}`}>
                      {statusNames[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-sm border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Kutilmoqda</option>
                      <option value="confirmed">Tasdiqlangan</option>
                      <option value="shipped">Yo'lda</option>
                      <option value="delivered">Yetkazilgan</option>
                      <option value="cancelled">Bekor qilingan</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              {filter === 'all' ? 'Buyurtmalar yo\'q' : `${statusNames[filter]} buyurtmalar yo'q`}
            </p>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusNames).map(([status, name]) => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className={`p-4 rounded-lg border-2 ${statusColors[status]}`}>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
