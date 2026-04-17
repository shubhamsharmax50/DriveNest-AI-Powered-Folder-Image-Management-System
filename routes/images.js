const router = require('express').Router();
const auth = require('../middlewares/auth');
const Image = require('../models/Image');
const { upload } = require('../cloudinary');

// Upload image Request
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No image provided' });

    const { folderId } = req.body; // Can be null for root
    
    const newImage = new Image({
      name: req.file.originalname,
      url: req.file.path,
      size: req.file.size || 0, // Cloudinary provides size
      folderId: folderId || null,
      userId: req.user
    });

    const savedImage = await newImage.save();
    res.json(savedImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get images in a specific folder (or root)
router.get('/', auth, async (req, res) => {
  try {
    const { folderId } = req.query;
    const query = { userId: req.user };
    if (folderId) {
      query.folderId = folderId;
    } else {
      query.folderId = null;
    }
    const images = await Image.find(query);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
