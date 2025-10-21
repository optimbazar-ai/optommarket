'use client';
import { useFetch } from '@/hooks/useFetch';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image_url?: string;
  description?: string;
}

export default function Home() {
  const { data: products, loading, error } = useFetch<Product[]>('/products?limit=8');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">🛒 OPTOMMARKET</h1>
        <p className="text-2xl mb-6">O'zbekiston uchun zamonaviy optom savdo platformasi</p>
        <p className="text-lg mb-8 text-blue-100">AI Chatbot integratsiyasi bilan</p>
        <Link 
          href="/products" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition inline-block"
        >
          Mahsulotlarni ko'rish 🚀
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-xl mb-2">Tez Yetkazib Berish</h3>
          <p className="text-gray-600">24 soat ichida O'zbekiston bo'ylab</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-3">💯</div>
          <h3 className="font-bold text-xl mb-2">Sifat Kafolati</h3>
          <p className="text-gray-600">Barcha mahsulotlar sertifikatlangan</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="font-bold text-xl mb-2">AI Chatbot</h3>
          <p className="text-gray-600">24/7 yordam va maslahat</p>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Ommabop Mahsulotlar</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            Barchasini ko'rish →
          </Link>
        </div>

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ⚠️ Xatolik: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
