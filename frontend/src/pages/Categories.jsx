import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Package, ArrowRight, Loader } from 'lucide-react';
import { categoriesAPI } from '../services/api';
import SEO from '../components/SEO';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data.data || data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-dark-muted">Kategoriyalar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Kategoriyalar - OptoMarket.uz"
        description="Barcha mahsulot kategoriyalari - OptoMarket.uz"
        keywords="kategoriyalar, mahsulotlar, optom savdo"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <Tag className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Kategoriyalar
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
              Bizning barcha mahsulot kategoriyalarimiz. O'zingizga kerakli kategoriyani tanlang.
            </p>
          </div>

          {/* Categories Grid */}
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">
                Kategoriyalar topilmadi
              </h3>
              <p className="text-gray-600 dark:text-dark-muted">
                Hozircha kategoriyalar mavjud emas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className="group bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-border hover:shadow-xl hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Tag className="w-8 h-8 text-white" />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {category.name}
                    </h3>

                    {/* Description */}
                    {category.description && (
                      <p className="text-sm text-gray-600 dark:text-dark-muted line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {/* Product Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-muted">
                      <Package className="w-4 h-4" />
                      <span>{category.productCount || 0} mahsulot</span>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ko'rish</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
