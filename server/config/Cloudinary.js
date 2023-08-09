import multer from 'multer';
import * as cloudinary from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dw04muhvn',
  api_key: '491187614532196',
  api_secret: 'LaeC7UEw4x8lfy8cCE3reD9RP3Y',
});

// Configure Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000, // 1MB in bytes
  },
});

export { upload, cloudinary };
