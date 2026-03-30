const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = (folder) =>
    new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => ({
            folder: `karigar-hub/${folder}`,
            resource_type: file.mimetype.startsWith("video") ? "video" : "image",
            format: undefined, // keep original format
        }),
    });

const uploadImage = (folder) => multer({ storage: storage(folder) });
const uploadVideo = (folder) => multer({ storage: storage(folder) });

module.exports = { uploadImage, uploadVideo };
