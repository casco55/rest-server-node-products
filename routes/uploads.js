const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/uploads');

const { inputsValidate } = require("../middlewares/inputs-validate");


const router = Router();

router.post('/', uploadFile );

module.exports = router;