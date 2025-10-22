import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Star } from 'lucide-react'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  if (viewMode === 'list') {
    return (
      <Link 
        to={`/products/${product._id}`}
        className="group flex gap-6 bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        {/* Image */}
        <div className="w-48 h-48 flex-shrink-0 bg-gray-100 dark:bg-dark-bg rounded-xl overflow-hidden">
          {product.images && product.images[0] ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-20 h-20 text-gray-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                {product.featured && (
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full mb-2 font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Top mahsulot
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
                {product.brand && (
                  <p className="text-gray-500 dark:text-dark-muted mt-1">{product.brand}</p>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-dark-muted line-clamp-2 mb-4">
              {product.description || 'Mahsulot haqida ma\'lumot'}
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {formatPrice(product.wholesalePrice || product.price)}
                </span>
                {product.wholesalePrice && (
                  <span className="text-lg text-gray-500 dark:text-dark-muted line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600 dark:text-dark-muted">
                  Min buyurtma: {product.minOrderQuantity} {product.unit}
                </span>
                <span className={product.stock > 0 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                  {product.stock > 0 ? `✓ ${product.stock} ta mavjud` : '✗ Tugagan'}
                </span>
              </div>
            </div>

            <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Ko'rish
            </button>
          </div>
        </div>
      </Link>
    )
  }

  // Grid view (default)
  return (
    <Link 
      to={`/products/${product._id}`}
      className="group relative bg-white dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-dark-bg overflow-hidden">
        {product.images && product.images[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          {product.featured && (
            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Top
            </div>
          )}
          {product.stock === 0 && (
            <div className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              Tugagan
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.brand && (
          <p className="text-xs text-gray-500 dark:text-dark-muted mb-1 uppercase tracking-wide">
            {product.brand}
          </p>
        )}
        
        <h3 className="font-bold text-gray-900 dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.wholesalePrice || product.price)}
          </span>
          {product.wholesalePrice && (
            <span className="text-sm text-gray-500 dark:text-dark-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-dark-muted pt-3 border-t border-gray-100 dark:border-dark-border">
          <span>Minimal: {product.minOrderQuantity} {product.unit}</span>
          <span className={product.stock > 0 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
            {product.stock > 0 ? `${product.stock} ta` : 'Tugagan'}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </Link>
  )
}

export default ProductCard
