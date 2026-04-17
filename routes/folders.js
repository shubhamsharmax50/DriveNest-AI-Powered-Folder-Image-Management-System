const router = require('express').Router();
const auth = require('../middlewares/auth');
const Folder = require('../models/Folder');
const Image = require('../models/Image');

// Create Folder
router.post('/', auth, async (req, res) => {
  try {
    const { name, parentFolderId } = req.body;
    const newFolder = new Folder({
      name,
      userId: req.user,
      parentFolderId: parentFolderId || null
    });
    const savedFolder = await newFolder.save();
    res.json(savedFolder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get folders inside a parent folder (if parentFolderId is null, gets root folders)
router.get('/', auth, async (req, res) => {
  try {
    const { parentFolderId } = req.query;
    const query = { userId: req.user };
    if (parentFolderId) {
      query.parentFolderId = parentFolderId;
    } else {
      query.parentFolderId = null;
    }
    const folders = await Folder.find(query);
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recursive folder size calculation API
router.get('/:id/size', auth, async (req, res) => {
  try {
    const calculateSize = async (folderId) => {
      let totalSize = 0;
      
      // Get all images in this folder
      const images = await Image.find({ folderId, userId: req.user });
      for (const img of images) {
        totalSize += img.size;
      }
      
      // Get all subfolders
      const subfolders = await Folder.find({ parentFolderId: folderId, userId: req.user });
      for (const sub of subfolders) {
        totalSize += await calculateSize(sub._id);
      }
      
      return totalSize;
    };

    const size = await calculateSize(req.params.id);
    res.json({ size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
