const { request } = require("express");
const { response } = require("express");


const isAdminRole = (req = request, res = response, next) => {
    if( !req.user ){
        return res.status(500).json({
            ok: false,
            msg: "Se quiere verificar el rol"
        });
    }

    const { role, nombre } = req.user;
    if( role !== "ADMIN_ROLE" ){
        return res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no es administrador`
        });
    }

    next();
};

const haveRole = (...roles) => {
    return (req = request, res = response, next) => {
        if( !req.user ){
            return res.status(500).json({
                ok: false,
                msg: "Se quiere verificar el rol"
            });
        }

        if( !roles.includes(req.user.role) ){
            return res.status(401).json({
                ok: false,
                msg: `El usuario debe tener uno de estos roles ${roles}`
            });
        }

        next();
    }

}


module.exports = {isAdminRole, haveRole};