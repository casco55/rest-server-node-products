const Role = require('../models/role');
const {User, Category} = require('../models/');

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error('El rol no existe');
    }
}
 //verificar si correo existe
const mailExist = async (email = '') => {
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new Error('El correo ya existe');
    }
}
// verificar id
const isValidId = async (id = '') => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error('El id no existe');
    }
}

// verificar si existe categoría por id
const isValidCategoryId = async (id = '') => {
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new Error(`La categoría ${id} no existe`);
    }
}
// verificar si existe producto por id
const isValidProductId = async (id = '') => {
    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`El producto ${id} no existe`);
    }
}


module.exports = { 
    isValidRole,
    mailExist,
    isValidId,
    isValidCategoryId,
    isValidProductId
};