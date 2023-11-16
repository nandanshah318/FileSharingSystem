const express = require("express");
const { fileUploadController, getImage } = require("../controllers/fileUploadController");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // Initialize multer

router.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

router.post("/file/fileUpload", upload.single('file'), fileUploadController);
router.get('/file/:fileId', getImage);

module.exports = router;
