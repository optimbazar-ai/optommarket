import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BASE_URL = API_URL.replace('/api', ''); // For static files

const ImageUpload = ({ 
  images = [], 
  onChange, 
  maxImages = 5,
  label = "Mahsulot rasmlari"
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (!files.length) return;

    // Check max images limit
    if (images.length + files.length > maxImages) {
      setError(`Maksimal ${maxImages} ta rasm yuklash mumkin`);
      return;
    }

    // Validate file types and sizes
    const invalidFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return !isValidType || !isValidSize;
    });

    if (invalidFiles.length > 0) {
      setError('Faqat rasm fayllari (max 5MB) yuklash mumkin');
      return;
    }

    setError('');
    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('image', files[i]);

        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/upload/single`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              ((i + progressEvent.loaded / progressEvent.total) / files.length) * 100
            );
            setUploadProgress(percentCompleted);
          }
        });

        if (response.data.success) {
          // Convert relative URL to full URL (static files are served from root, not /api)
          const imageUrl = `${BASE_URL}${response.data.data.url}`;
          uploadedUrls.push(imageUrl);
        }
      }

      // Update parent component with new images
      onChange([...images, ...uploadedUrls]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Rasm yuklashda xatolik');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // Create a fake event object
    const fakeEvent = {
      target: {
        files: files
      }
    };
    handleFileSelect(fakeEvent);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {images.length > 0 && `(${images.length}/${maxImages})`}
      </label>

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="space-y-3">
              <Loader className="w-12 h-12 text-primary-600 mx-auto animate-spin" />
              <p className="text-gray-600">Yuklanmoqda... {uploadProgress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600">
                  <span className="text-primary-600 font-semibold">Click qiling</span> yoki rasmni bu yerga torting
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF, WEBP (max 5MB, {maxImages - images.length} ta qoldi)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-md">
                  Asosiy
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Helper text */}
      {images.length === 0 && !uploading && (
        <p className="mt-2 text-xs text-gray-500">
          💡 Birinchi rasm asosiy rasm bo'ladi
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
