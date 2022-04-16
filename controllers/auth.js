const response = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../helpers/generateJWT');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        // verificar si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // verificar si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no está activo'
            });
        }
        // Verificar si la contraseña es correcta
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        // generar JWT
        const token = await generateToken( user.id );
        res.json({
            ok: true,
            user,
            token
        });
    
    }catch(error){
        return res.status(500).json({
            msg: 'Hubo un error',

        })
    }
     
    
}

module.exports = {
    login
}