const { request, response } = require('express');
const { Product } = require('../models');

// obtener todos los productos - paginado - total - populate
const getProducts = async (req = request, res = response) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const [total, products] = await Promise.all([
        Product.countDocuments({ available: true }),
        Product.find({ available: true })
            .skip(skip)
            .limit(Number(limit))
            .populate('category', 'name')
            .populate('user', 'name')
    ]);
    res.status(200).json({
        total,
        products
    });
}

// obtener todos los productos de una categoria - paginado - total - populate
const getProductsByCategory = async (req = request, res = response) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const [total, products] = await Promise.all([
        Product.countDocuments({ available: true, category: req.params.id }),
        Product.find({ available: true, category: req.params.id })
            .skip(skip)
            .limit(Number(limit))
            .populate('category', 'name')
            .populate('user', 'name')
    ]);
    res.status(200).json({
        total,
        products
    });
}

// obtener producto por id
const getProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('category', 'name')
        .populate('user', 'nombre');
    res.status(200).json({
        product
    });
}

// crear producto
const createProduct = async (req = request, res = response) => {
    const { state, user, ...body } = req.body;

    //verificar si existe producto
    const productDB = await Product.findOne({ name: body.name.toUpperCase() });

    if (productDB) {
        return res.status(400).json({
            ok: false,
            msg: `El producto ${productDB.name} ya existe`
        });
    }
    // generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        category: req.body.category,
        user: req.user._id
    }

    const product = new Product(data);

    // guardar en la base de datos
    await product.save();

    res.status(201).json({
        ok: true,
        product
    });
}

// actualizar un producto
const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if(data.name) {
        data.name = data.name.toUpperCase();        
    }
    data.user = req.user._id;
    data.category = req.body.category;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        ok: true,
        product
    });
}

//Eliminar un producto
const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate(id, { available: false });

    res.status(200).json({
        ok: true,
        product: deletedProduct
    });
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}