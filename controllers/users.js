const { response } = require('express');

const getUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'get API - controlador de usuarios'
    });
};

const postUsers = (req, res = response) => {

    const body = req.body;

    res.status(201).json({
        msg: 'post API - controlador de usuarios',
        body
    });
};

const putUsers = (req, res = response) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'put API - controlador de usuarios',
        id
    });
};

const patchUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'patch API - controlador de usuarios'
    });
};

const deleteUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'delete API - controlador de usuarios'
    });
};

module.exports = { 
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
};