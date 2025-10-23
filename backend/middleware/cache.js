import NodeCache from 'node-cache';

// Cache instance - 5 daqiqa standard TTL
const cache = new NodeCache({
  stdTTL: 300, // 5 daqiqa (300 sekund)
  checkperiod: 60, // Har 60 sekundda eski ma'lumotlarni tozalash
  useClones: false, // Performance uchun
  deleteOnExpire: true
});

// Cache middleware - GET requestlar uchun
export const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Faqat GET requestlar uchun cache
    if (req.method !== 'GET') {
      return next();
    }

    // Cache key yaratish (URL + query parameters)
    const key = `__express__${req.originalUrl || req.url}`;
    
    // Cache'dan olish
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      console.log(`✓ Cache HIT: ${key}`);
      return res.json(cachedResponse);
    }

    console.log(`✗ Cache MISS: ${key}`);

    // Original res.json funksiyasini saqlash
    const originalJson = res.json.bind(res);

    // res.json funksiyasini override qilish
    res.json = (body) => {
      // Cache'ga saqlash (faqat successful responses)
      if (res.statusCode === 200) {
        cache.set(key, body, duration);
      }
      return originalJson(body);
    };

    next();
  };
};

// Kategoriyalar uchun cache (uzoq vaqt - 1 soat)
export const categoriesCache = cacheMiddleware(3600);

// Mahsulotlar ro'yxati uchun cache (5 daqiqa)
export const productsCache = cacheMiddleware(300);

// Bitta mahsulot uchun cache (10 daqiqa)
export const productCache = cacheMiddleware(600);

// Blog posts uchun cache (30 daqiqa)
export const blogCache = cacheMiddleware(1800);

// SEO metadata uchun cache (1 soat)
export const seoCache = cacheMiddleware(3600);

// Cache'ni tozalash funksiyasi
export const clearCache = (pattern) => {
  if (pattern) {
    // Pattern bo'yicha tozalash
    const keys = cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    matchingKeys.forEach(key => cache.del(key));
    console.log(`✓ Cache cleared: ${matchingKeys.length} keys matching "${pattern}"`);
  } else {
    // Barcha cache'ni tozalash
    cache.flushAll();
    console.log('✓ All cache cleared');
  }
};

// Statistika
export const getCacheStats = () => {
  return {
    keys: cache.keys().length,
    hits: cache.getStats().hits,
    misses: cache.getStats().misses,
    ksize: cache.getStats().ksize,
    vsize: cache.getStats().vsize
  };
};

// Admin uchun cache clear endpoint helper
export const clearCacheByType = (type) => {
  switch (type) {
    case 'products':
      clearCache('/api/products');
      break;
    case 'categories':
      clearCache('/api/categories');
      break;
    case 'blog':
      clearCache('/api/blog');
      break;
    case 'all':
      clearCache();
      break;
    default:
      return false;
  }
  return true;
};

export default cacheMiddleware;
