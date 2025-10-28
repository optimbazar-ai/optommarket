import express from 'express';
import {
  getAllPromoCodes,
  createPromoCode,
  validatePromoCode,
  applyPromoCode,
  updatePromoCode,
  deletePromoCode
} from '../controllers/promoCodeController.js';
import { protect, authorize } from '../middleware/auth.js';

// Admin middleware
const admin = authorize('admin');

const router = express.Router();

router.route('/')
  .get(protect, admin, getAllPromoCodes)
  .post(protect, admin, createPromoCode);

router.post('/validate', validatePromoCode);
router.post('/apply', protect, applyPromoCode);

router.route('/:id')
  .put(protect, admin, updatePromoCode)
  .delete(protect, admin, deletePromoCode);

export default router;
