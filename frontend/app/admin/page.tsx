'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/constants';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  totalStock: number;
}

interface RecentOrder {
  id: number;
  username: string;
  email: string;
  total_amount: string;
  status: string;
  created_at: string;
}

interface LowStockProduct {
  id: number;
  name: string;
  quantity: number;
  price: string;
  category: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Dashboard ma\'lumotlarini olishda xatolik');

      const data = await response.json();
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
      setLowStockProducts(data.lowStockProducts);
    } catch (error) {
      console.error('Dashboard error:', error);
      alert('Dashboard ma\'lumotlarini yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Buyurtmalar</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.totalOrders}</p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Daromad</p>
              <p className="text-3xl font-bold text-gray-800">
                ${stats?.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Foydalanuvchilar</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Mahsulotlar</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.totalProducts}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Umumiy Stok</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.totalStock}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Oxirgi Buyurtmalar</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foydalanuvchi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Summa</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">#{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.email}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total_amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <p className="text-center text-gray-500 py-4">Buyurtmalar yo'q</p>
          )}
        </div>
      </div>

      {/* Low Stock Products */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚠️ Kam Qolgan Mahsulotlar</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nomi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategoriya</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Narxi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Miqdori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lowStockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">#{product.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${product.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.quantity < 5 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.quantity} dona
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lowStockProducts.length === 0 && (
            <p className="text-center text-gray-500 py-4">Barcha mahsulotlar yetarli miqdorda</p>
          )}
        </div>
      </div>
    </div>
  );
}
