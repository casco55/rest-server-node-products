const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidate = async (req= request, res = response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        // verificar state del usuario
        if (!user.state) {
            return res.status(401).json({
                ok: false,
                msg: "El usuario no está activo"
            });
        }

        req.user = user;

        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        });
    }

    
}

module.exports = jwtValidate;