import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

/**
 * Upload image to ImgBB
 * @param {string} imagePath - Path to image file
 * @returns {Promise<string>} - Image URL
 */
export const uploadToImgBB = async (imagePath) => {
  try {
    const apiKey = process.env.IMGBB_API_KEY;
    
    if (!apiKey) {
      throw new Error('IMGBB_API_KEY not configured');
    }

    // Read image file as base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Upload to ImgBB
    const formData = new FormData();
    formData.append('image', base64Image);
    formData.append('key', apiKey);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders(),
      params: {
        key: apiKey
      }
    });

    if (response.data.success) {
      return response.data.data.url;
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error('❌ ImgBB upload error:', error.message);
    throw error;
  }
};

/**
 * Upload multiple images to ImgBB
 * @param {Array<string>} imagePaths - Array of image paths
 * @returns {Promise<Array<string>>} - Array of image URLs
 */
export const uploadMultipleToImgBB = async (imagePaths) => {
  const uploadPromises = imagePaths.map(path => uploadToImgBB(path));
  return Promise.all(uploadPromises);
};

export default { uploadToImgBB, uploadMultipleToImgBB };
