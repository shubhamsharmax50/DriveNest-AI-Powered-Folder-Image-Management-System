require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage Engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'drivenest', // Folder name in Cloudinary where images will be uploaded
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'], // Allowed file formats
    // transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: image transformations
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
