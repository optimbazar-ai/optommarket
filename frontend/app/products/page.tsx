'use client';
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CATEGORIES } from '@/lib/constants';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image_url?: string;
  description?: string;
}

export default function ProductsPage() {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Build URL
  let url = '/products';
  const params = [];
  if (category) params.push(`category=${category}`);
  if (search) params.push(`search=${search}`);
  if (params.length > 0) url += `?${params.join('&')}`;

  const { data: products, loading, error } = useFetch<Product[]>(url, [category, search]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📦 Barcha Mahsulotlar</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qidirish
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Mahsulot nomi, tavsif..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                🔍 Qidirish
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoriya
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Barcha kategoriyalar</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(category || search) && (
          <div className="mt-4 flex gap-2 items-center">
            <span className="text-sm text-gray-600">Faol filtrlar:</span>
            {category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {category}
                <button onClick={() => setCategory('')} className="text-blue-600 hover:text-blue-800">×</button>
              </span>
            )}
            {search && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                "{search}"
                <button onClick={() => { setSearch(''); setSearchInput(''); }} className="text-green-600 hover:text-green-800">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ⚠️ Xatolik: {error}
        </div>
      )}

      {!loading && products && products.length === 0 && (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-2xl text-gray-600">😔 Mahsulot topilmadi</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products && products.length > 0 && (
        <div className="mt-8 text-center text-gray-600">
          Jami {products.length} ta mahsulot topildi
        </div>
      )}
    </div>
  );
}
