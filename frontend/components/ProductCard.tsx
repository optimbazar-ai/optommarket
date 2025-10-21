'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  image_url?: string;
  description?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url
    });
    toast.success(`${product.name} savatga qo'shildi!`);
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105">
      {product.image_url ? (
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-48 object-cover mb-3 rounded-lg"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 mb-3 rounded-lg flex items-center justify-center text-6xl">
          📦
        </div>
      )}

      {product.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
          {product.category}
        </span>
      )}

      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
        {product.name}
      </h3>

      {product.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
      )}

      <div className="flex items-center justify-between mb-3">
        <p className="text-green-600 font-bold text-xl">
          {product.price.toLocaleString()} so'm
        </p>
        {product.quantity !== undefined && (
          <span className="text-xs text-gray-500">
            Stok: {product.quantity}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/products/${product.id}`} 
          className="flex-1 bg-blue-500 text-white p-2 rounded text-center hover:bg-blue-600 transition"
        >
          Ko'rish
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? 'Tugagan' : '🛒 Savat'}
        </button>
      </div>
    </div>
  );
}
