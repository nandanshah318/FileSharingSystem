const express= require("express");
const { fileUploadController, getImage } = require("../controllers/fileUploadController");

const router = express.Router();
//data send krna 
router.post("/fileUpload", fileUploadController);
router.get('/file/:fileId', getImage);
//export function module
module.exports = router;