const router = require('express').Router();
const auth = require('../middlewares/auth');
const Folder = require('../models/Folder');
const Image = require('../models/Image');
const { generateGroqResponse } = require('../groqClient');

router.post('/prompt', auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // We fetch the user's folders to give context to the AI
    const folders = await Folder.find({ userId: req.user });
    const contextStr = folders.map(f => `Folder: ${f.name} (ID: ${f._id})`).join(', ');

    const systemPrompt = `You are an AI assistant managing a file system. 
    The user has the following folders: ${contextStr || 'No folders yet'}.
    Based on the users prompt, return a JSON object with two fields: 
    "action": indicating the action ('create_folder', 'list_images', etc)
    "payload": the necessary data (e.g., {"folderName": "Vacation", "parentFolderId": "..."}).
    Return strictly JSON without comments or markdown.
    User Prompt: "${prompt}"`;

    const aiResponse = await generateGroqResponse(systemPrompt);
    
    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse);
    } catch(e) {
       // if string is returned normally
       return res.json({ msg: parseData });
    }
    
    if (parsedData.action === 'create_folder') {
      const newFolder = new Folder({
        name: parsedData.payload.folderName,
        userId: req.user,
        parentFolderId: parsedData.payload.parentFolderId || null
      });
      await newFolder.save();
      return res.json({ msg: `AI created folder: ${newFolder.name}`, folder: newFolder });
    }
    
    if (parsedData.action === 'list_images') {
       const images = await Image.find({ folderId: parsedData.payload.folderId, userId: req.user });
       return res.json({ msg: `Found ${images.length} images`, images });
    }

    res.json(parsedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
