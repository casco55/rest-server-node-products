const { response } = require("express");
const { request } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require("mongodb");



// buscar usuario
const searchUser = async ( termn = '', res = response ) => {
    const isMongoId = ObjectId.isValid(termn);
    if( isMongoId ){
        const user = await User.findById(termn);
        return res.status(200).json({
            ok: true,
            result: ( user ) ? user  : {}
        });
    }

    const regex = new RegExp(termn, 'i');

    const users = await User.find({ 
        $or: [
            { nombre: regex },
            { email: regex },
        ],
        $and: [{ state: true }]
    });
    res.status(200).json({
        ok: true,
        result: (users) ? users : []
    });
}
// buscar categorías
const searchCategory = async ( termn = '', res = response ) => {
    const isMongoId = ObjectId.isValid(termn);
    if( isMongoId ){
        const category = await Category.findById(termn);
        return res.status(200).json({
            ok: true,
            result: ( category ) ? category  : {}
        });
    }
    const regex = new RegExp(termn, 'i');
    const categories = await Category.find({ name: regex, state: true });
    res.status(200).json({
        ok: true,
        result: (categories) ? categories : [],
    });


}
// buscar productos
const searchProduct = async ( termn = '', res = response ) => {
    const isMongoId = ObjectId.isValid(termn);
    if( isMongoId ){
        const product = await Product.findById(termn).populate
        ('category', 'name');
        return res.status(200).json({
            ok: true,
            result: ( product ) ? product  : {}
        });
    }
    const regex = new RegExp(termn, 'i');
    const products = await Product.find({
        $or: [{name: regex}],
        $and: [{available: true}]
    }).populate
    ('category', 'name');
    res.status(200).json({
        ok: true,
        result: (products) ? products : [],
    });
    
}



const search = ( req = request, res = response ) => {
    const { collection, termn } = req.params;

    switch (collection) {
        case 'users':
            searchUser(termn, res)
            break;
        case 'categories':
            searchCategory(termn, res)
            break;
        case 'products':
            searchProduct(termn, res)
            break;
                
        default:
            break;
    }
}

module.exports = {
    search
}