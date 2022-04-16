const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { inputsValidate } = require('../middlewares/inputs-validate');

const router = Router();

router.post('/login',
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    inputsValidate,    
    login)

module.exports = router;