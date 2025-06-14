const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { handleUpload } = require('../controllers/upload');

router.post('/upload', upload.single('media'), handleUpload);

module.exports = router;
