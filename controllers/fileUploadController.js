const fileModel = require("../models/fileModel");
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config();

const fileUploadController = async (req, res) => {
    try {
        // Log only necessary information to prevent exposing sensitive data
        console.log("Request received for file upload", req.body, req.file);

        // Access non-file form fields from req.body
        const { fileName, fileType, fileExpiry, isGuestUser } = req.body || {};

        // Validate non-file form fields
        const schema = Joi.object({
            fileName: Joi.string().required(),
            fileType: Joi.string().required(),
            fileExpiry: Joi.date().required(),
            isGuestUser: Joi.boolean().required(),
        });

        const { error: bodyError } = schema.validate({ fileName, fileType, fileExpiry, isGuestUser });
        if (bodyError) {
            return res.status(422).send({ error: bodyError.details[0].message });
        }

        // Access file-related information from req.file
        const { originalname, buffer } = req.file;

        // Define the destination directory
        const destinationDirectory = path.join(__dirname, 'uploads');

        // Create the destination directory if it doesn't exist
        require('fs').mkdirSync(destinationDirectory, { recursive: true });

        // Save the file to the destination directory
        const filePath = path.join(destinationDirectory, originalname);
        require('fs').writeFileSync(filePath, buffer);

        // Validate file-related information
        const fileSchema = Joi.object({
            originalname: Joi.string().required(),
            buffer: Joi.binary().required(),
        });

        const { error: fileError } = fileSchema.validate({ originalname, buffer });
        if (fileError) {
            return res.status(422).send({ error: fileError.details[0].message });
        }

        const newFileUpload = await new fileModel({
            fileName,
            fileType,
            file: filePath, // Assuming you want to store the file path
            fileExpiry,
            isGuestUser,
        }).save();

        const responseFilePath = `http://localhost:${process.env.PORT}/file/${newFileUpload._id}`;

        return res.status(200).json({
            success: true,
            message: "File Uploaded Successfully",
            path: responseFilePath,
        });
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
};

module.exports = { fileUploadController, getImage };
