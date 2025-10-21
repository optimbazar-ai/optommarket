export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const CATEGORIES = [
  'Oziq-ovqat',
  'Texnika',
  'Kiyim',
  'Kitoblar',
  'Boshqa'
];

export const ORDER_STATUS = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled'
];

export const ORDER_STATUS_UZ: Record<string, string> = {
  pending: 'Kutilmoqda',
  confirmed: 'Tasdiqlandi',
  shipped: 'Yo\'lda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi'
};
