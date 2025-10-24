import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'optommarket', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // Resize images
    public_id: (req, file) => {
      // Generate unique filename
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000000000);
      const filename = file.originalname.split('.')[0];
      return `${filename}-${timestamp}-${randomNum}`;
    }
  }
});

// Multer upload configuration with Cloudinary
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Faqat rasm fayllarini yuklash mumkin!'), false);
    }
    cb(null, true);
  }
});

export default cloudinary;
