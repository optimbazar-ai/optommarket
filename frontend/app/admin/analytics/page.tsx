'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  orders: string;
  revenue: string;
}

interface ProductData {
  name: string;
  total_sold: string;
}

export default function Analytics() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch sales analytics
      const salesResponse = await fetch(`${API_URL}/admin/analytics/sales`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Fetch products analytics
      const productsResponse = await fetch(`${API_URL}/admin/analytics/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!salesResponse.ok || !productsResponse.ok) {
        throw new Error('Analytics ma\'lumotlarini olishda xatolik');
      }

      const sales = await salesResponse.json();
      const products = await productsResponse.json();

      setSalesData(sales);
      setProductsData(products);
    } catch (error) {
      console.error('Analytics error:', error);
      toast.error('Statistika yuklashda xatolik');
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

  // Format sales data for chart
  const formattedSalesData = salesData.map(item => ({
    date: new Date(item.date).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' }),
    Buyurtmalar: parseInt(item.orders),
    Daromad: parseFloat(item.revenue),
  }));

  // Format products data for chart
  const formattedProductsData = productsData.map(item => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
    Sotilgan: parseInt(item.total_sold),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">📈 Statistika va Tahlil</h2>
        <button
          onClick={fetchAnalytics}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          🔄 Yangilash
        </button>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Sotuvlar Tendensiyasi (30 kun)</h3>
        {formattedSalesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Buyurtmalar"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Daromad"
                stroke="#10B981"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">Ma'lumotlar mavjud emas</p>
            <p className="text-sm">Oxirgi 30 kun ichida buyurtmalar yo'q</p>
          </div>
        )}
      </div>

      {/* Top Products Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Eng Ko'p Sotilgan Mahsulotlar (Top 10)</h3>
        {formattedProductsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formattedProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sotilgan" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">Ma'lumotlar mavjud emas</p>
            <p className="text-sm">Hali buyurtmalar yo'q</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Jami Buyurtmalar</p>
              <p className="text-3xl font-bold">
                {formattedSalesData.reduce((sum, item) => sum + item.Buyurtmalar, 0)}
              </p>
              <p className="text-blue-100 text-xs mt-1">Oxirgi 30 kun</p>
            </div>
            <div className="text-5xl opacity-50">🛒</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Jami Daromad</p>
              <p className="text-3xl font-bold">
                ${formattedSalesData.reduce((sum, item) => sum + item.Daromad, 0).toFixed(2)}
              </p>
              <p className="text-green-100 text-xs mt-1">Oxirgi 30 kun</p>
            </div>
            <div className="text-5xl opacity-50">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Sotilgan Mahsulotlar</p>
              <p className="text-3xl font-bold">
                {productsData.reduce((sum, item) => sum + parseInt(item.total_sold), 0)}
              </p>
              <p className="text-purple-100 text-xs mt-1">Jami dona</p>
            </div>
            <div className="text-5xl opacity-50">📦</div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      {productsData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Mahsulotlar Reytingi</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">O'rni</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mahsulot Nomi</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sotilgan</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nisbat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productsData.map((product, index) => {
                  const totalSold = productsData.reduce((sum, p) => sum + parseInt(p.total_sold), 0);
                  const percentage = ((parseInt(product.total_sold) / totalSold) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className={`inline-block w-8 h-8 rounded-full text-white font-bold flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.total_sold} dona</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
