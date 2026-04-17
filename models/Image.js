const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number, required: true }, // Size in bytes
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null }, // Null means root directory
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
