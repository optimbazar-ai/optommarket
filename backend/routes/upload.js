import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';
import { uploadToImgBB } from '../config/imgbb.js';
import fs from 'fs';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Single image upload
router.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Rasm yuklanmadi'
      });
    }

    // Upload to ImgBB
    const imageUrl = await uploadToImgBB(req.file.path);

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: 'Rasm muvaffaqiyatli yuklandi',
      data: {
        filename: req.file.filename,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('File cleanup error:', e);
      }
    }
    
    console.error('❌ Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Rasm yuklashda xatolik',
      error: error.message
    });
  }
});

// Multiple images upload
router.post('/multiple', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Rasmlar yuklanmadi'
      });
    }

    // Upload all images to ImgBB
    const uploadPromises = req.files.map(async (file) => {
      const url = await uploadToImgBB(file.path);
      // Delete local file after upload
      fs.unlinkSync(file.path);
      return {
        filename: file.filename,
        url: url,
        size: file.size,
        mimetype: file.mimetype
      };
    });

    const images = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: `${req.files.length} ta rasm muvaffaqiyatli yuklandi`,
      data: images
    });
  } catch (error) {
    // Clean up local files on error
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {
          console.error('File cleanup error:', e);
        }
      });
    }

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
