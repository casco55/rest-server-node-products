const { request } = require("express");
const { response } = require("express");
const { uploadImage } = require("../helpers/upload-file");


const uploadFile  = async ( req = request, res = response ) => {
    const {image} = req.files;
    if (!image || Object.keys(image).length === 0 || !image) {
        return res.status(400).json({
            ok: false,
            message: "No files were uploaded."
        });
    }
    try {
        const fullPath = await uploadImage(image, 'text');
        res.status(200).json(fullPath);

    } catch (err) {
        res.status(400).json({
            ok: false,
            message: err
        });
    }
    
}


module.exports = {
    uploadFile
}