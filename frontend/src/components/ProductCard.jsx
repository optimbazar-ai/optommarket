import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  return (
    <Link to={`/products/${product._id}`} className="card p-4 block">
      {/* Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {product.images && product.images[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-16 h-16 text-gray-400" />
        )}
      </div>

      {/* Info */}
      <div>
        {product.featured && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2">
            ⭐ Top
          </span>
        )}
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}
        
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(product.wholesalePrice || product.price)}
          </span>
          {product.wholesalePrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Min: {product.minOrderQuantity} {product.unit}</span>
          <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
            {product.stock > 0 ? `${product.stock} ta` : 'Tugagan'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
