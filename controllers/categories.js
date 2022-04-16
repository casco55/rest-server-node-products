const { request } = require("express");
const { response } = require("express");
const { Category } = require("../models");

// obtener todas las categorias - paginado - total - populate
const getCategories = async (req = request, res = response) => {
    const { limit = 5, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const [total, categories] = await Promise.all([
        Category.countDocuments({ state: true }),
        Category.find({ state: true })
            .skip(skip)
            .limit(Number(limit))
            .populate('user', 'nombre')
    ]);
    res.status(200).json({
        total,
        categories
    });
};

// obtener categoría por id
const getCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id)
        .populate('user', 'nombre');
    res.status(200).json({
        category
    });
};


const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    console.log(name)

    // verificar si existe categoria
    const categoryDB = await Category.findOne({ name: name });

    if (categoryDB) {
        return res.status(400).json({
            ok: false,
            msg: `La categoría ${categoryDB.name} ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    // guardar en la base de datos
    await category.save();

    res.status(201).json({
        ok: true,
        category
    });
}

// actualizar una categoría
const updateCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        ok: true,
        category
    });
}

// Eliminar una categoría
const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const deteltedCategory = await Category.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        ok: true,
        deteltedCategory
    });
}




module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}