import rateLimit from 'express-rate-limit';

// General API rate limiter - 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // Har bir IP uchun maksimal 100 ta request
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov yuborildi. Iltimos, 15 daqiqadan keyin qayta urinib ko\'ring.',
    retryAfter: '15 daqiqa'
  },
  standardHeaders: true, // Rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests to static files
  skip: (req) => req.path.startsWith('/uploads'),
});

// Stricter rate limiter for authentication routes - 50 requests per 15 minutes (temporary increased for testing)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 50, // Har bir IP uchun maksimal 50 ta login/register (test uchun ko'paytirildi)
  message: {
    success: false,
    message: 'Juda ko\'p login urinish. Xavfsizlik uchun 15 daqiqa kutishingiz kerak.',
    retryAfter: '15 daqiqa'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Block after max attempts for 15 minutes
  skipSuccessfulRequests: false,
});

// Payment route limiter - 10 requests per hour
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 soat
  max: 10, // Har bir IP uchun maksimal 10 ta to'lov so'rovi
  message: {
    success: false,
    message: 'Juda ko\'p to\'lov so\'rovi. 1 soat kutishingiz kerak.',
    retryAfter: '1 soat'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin routes limiter - 200 requests per 15 minutes (more lenient for admins)
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 200, // Admin uchun ko'proq ruxsat
  message: {
    success: false,
    message: 'Admin panel uchun juda ko\'p so\'rov.',
    retryAfter: '15 daqiqa'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Product search limiter - 50 requests per 5 minutes
export const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 daqiqa
  max: 50, // 50 ta qidiruv
  message: {
    success: false,
    message: 'Juda ko\'p qidiruv so\'rovi. 5 daqiqa kutishingiz kerak.',
    retryAfter: '5 daqiqa'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiLimiter;
