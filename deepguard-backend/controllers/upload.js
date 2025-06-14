const sightengineService = require('../services/sightengine');
const fs = require('fs');

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await sightengineService.analyze(req.file.path);
    fs.unlinkSync(req.file.path); // Clean up after processing

    res.json({
      filename: req.file.originalname,
      detected: result.detected,
      confidence: result.confidence,
      message: result.message
    });
  } catch (err) {
    res.status(500).json({ error: 'Detection failed', details: err.message });
  }
};
