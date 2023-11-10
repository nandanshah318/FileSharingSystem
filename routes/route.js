const express= require("express");
const { fileUploadController } = require("../controllers/fileUploadController");

const router = express.Router();
//data send krna 
router.post("/fileUpload", fileUploadController);
//export function module
module.exports = router;