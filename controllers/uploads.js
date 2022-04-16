const { request } = require("express");
const { response } = require("express");

const path = require("path");

const uploadFile  = ( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.files) {
        return res.status(400).json({
            ok: false,
            message: "No files were uploaded."
        });
    }

    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    const { files } = req.files;
    const { mimetype } = files;

    if (!validMimeTypes.includes(mimetype)) {
        return res.status(400).json({
            ok: false,
            message: "Invalid file type."
        });
    }
    const uploadPath = path.join(__dirname, "../uploads", files.name);
    files.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Error al subir archivo",
                err
            });
        }
        res.status(200).json({
            ok: true,
            message: "Archivo subido correctamente",
            uploadPath
        });
    });
}


module.exports = {
    uploadFile
}