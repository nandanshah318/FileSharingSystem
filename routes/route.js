const express = require("express");
const { fileUploadController, getImage } = require("../controllers/fileUploadController");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // Initialize multer

// Use upload.single('file') since you expect one file with the field name 'file'
router.post("/fileUpload", upload.single('file'), fileUploadController);

router.get('/file/:fileId', getImage);

module.exports = router;
