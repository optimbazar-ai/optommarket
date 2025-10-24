import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Single image upload
router.post('/single', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Rasm yuklanmadi'
      });
    }

    // Cloudinary returns full URL
    const imageUrl = req.file.path; // Cloudinary URL

    res.status(200).json({
      success: true,
      message: 'Rasm muvaffaqiyatli yuklandi',
      data: {
        filename: req.file.filename,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
        cloudinary_id: req.file.filename // For deletion later
      }
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Rasm yuklashda xatolik',
      error: error.message
    });
  }
});

// Multiple images upload
router.post('/multiple', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Rasmlar yuklanmadi'
      });
    }

    const images = req.files.map(file => ({
      filename: file.filename,
      url: file.path, // Cloudinary URL
      size: file.size,
      mimetype: file.mimetype,
      cloudinary_id: file.filename
    }));

    res.status(200).json({
      success: true,
      message: `${req.files.length} ta rasm muvaffaqiyatli yuklandi`,
      data: images
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Rasmlar yuklashda xatolik',
      error: error.message
    });
  }
});

// Error handling middleware for multer errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Fayl hajmi juda katta! Maksimal: 5MB'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Juda ko\'p fayl! Maksimal: 5 ta'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Fayl yuklashda xatolik'
  });
});

export default router;
