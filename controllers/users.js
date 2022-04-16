const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const getUsers = async (req, res = response) => {

    const { limit = 5, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const [total, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true})
        .skip(skip)
        .limit(Number(limit))
    ]);
    res.status(200).json({
        total,
        users
    });
};

const postUsers = async (req, res = response) => {

    const { nombre, email, password, role } = req.body;

    const user = new User( { nombre, email, password, role } );
   

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //guardar usuario
    await user.save();

    res.status(201).json({
        msg: 'post API - controlador de usuarios',
        user
    });
};

const putUsers = async (req, res = response) => {
    const id = req.params.id;

    const { _id, password, google, email, ...others } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        others.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, others);


    res.status(200).json({
        msg: 'put API - controlador de usuarios',
        user
    });
};

const patchUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'patch API - controlador de usuarios'
    });
};

const deleteUsers = async (req, res = response) => {
    const { id } = req.params;

    // Borrando el usuario
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: false });
    const authenticatedUser =  req.user;

    res.json({
        user,
        authenticatedUser
    })
};

module.exports = { 
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
};