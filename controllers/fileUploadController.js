const fileModel = require("../models/fileModel");
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config();

const fileUploadController = async (req, res) => {
    try {
        console.log("Request received for file upload", req.body, req.file);

        const { fileName, fileType, fileExpiry, isGuestUser } = req.body || {};

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

        const { originalname, buffer } = req.file;

        const destinationDirectory = path.join(__dirname, 'uploads');

        require('fs').mkdirSync(destinationDirectory, { recursive: true });

        const filePath = path.join(destinationDirectory, originalname);
        require('fs').writeFileSync(filePath, buffer);

        const fileSchema = Joi.object({
            originalname: Joi.string().required(),
            buffer: Joi.binary().required(),
        });

        const { error: fileError } = fileSchema.validate({ originalname, buffer });
        if (fileError) {
            return res.status(422).send({ error: fileError.details[0].message });
        }

        const newFileUpload = await new fileModel({
            fileName:fileSchema?.originalname,
            fileType,
            file: filePath,
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
    console.log('Inside getImage function');
    console.log('File ID:', request.params.fileId);
    try {
        const file = await fileModel.findById(request.params.fileId);
        console.log('File from database:', file);

        if (!file) {
            console.log('File not found');
            return response.status(404).json({ msg: "File not found" });
        }

        console.log('Found file:', file);

        file.downloadCount++;
        await file.save();

        const filePath = path.join(__dirname, 'uploads', file.name);
        console.log('File path:', filePath);

        response.sendFile(filePath);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
};


module.exports = { fileUploadController, getImage };
