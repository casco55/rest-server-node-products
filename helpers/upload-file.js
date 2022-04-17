const { v4: uuidv4 } = require('uuid');
const path = require("path");

const uploadImage = (image, dirName= '') => {
    return new Promise( (resolve, reject) => {
        const validMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        const { mimetype } = image;

        if (!validMimeTypes.includes(mimetype)) {
            return reject("Invalid file type");
        }
        const imageName = `${uuidv4()}-${image.name}`;
        const uploadPath = path.join(__dirname, "../uploads", dirName, imageName);
        image.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve({
                ok: true,
                message: "Archivo subido correctamente",
                imageName
            });
        });
    });
}
module.exports = {
    uploadImage
}