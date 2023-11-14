const fileModel = require("../models/fileModel");
const dotenv = require('dotenv');

dotenv.config();

const fileUploadController = async (req, res) => {
    try {
        console.log("request body",req.body); // This will log form data (non-file fields)

        const { file, fileType, fileName, fileExpiry, isGuestUser } = req.body;

        if (fileName && fileType && file && fileExpiry && isGuestUser) {
            const newFileUpload = await new fileModel({
                fileName,
                fileType,
                file,
                fileExpiry,
                isGuestUser
            }).save()
            return res.status(200).send({
                success: true,
                message: "File Uploaded Successfully",
            }).json({path:`http://localhost:${process.env.PORT}/file/${newFileUpload._id}`})
        } else {
            return res.status(422).send({ error: `${!fileName?"File Name":!fileType?"File Type":!file?"File":!fileExpiry?"File Expiry":"Is Guest User"} Not found` });
        }
    } catch (error) {
        console.error(error);
        return res.status(422).send({ error: "Error in file upload" });
    }
};

const getImage = async (request, response) => {
    try {   
        const file = await File.findById(request.params.fileId);
        
        file.downloadCount++;

        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}

module.exports = { fileUploadController, getImage };
