const { Router } = require("express");
const { check } = require("express-validator");
const { createProduct, getProducts, getProductsByCategory, getProduct, updateProduct, deleteProduct } = require("../controllers/products");
const { isValidCategoryId } = require("../helpers/db-validators");
const { isValidProductId } = require("../helpers/db-validators");
const { inputsValidate } = require("../middlewares/inputs-validate");
const jwtValidate = require("../middlewares/jwtValidate");
const { isAdminRole } = require("../middlewares/roleValidate");

const router = Router();

// obtener todos los productos - público
router.get("/", getProducts);

//obtener todos los productos de una categoria - público
router.get("/category/:id", [
    check('id', 'no es una id válida').isMongoId(),
    check('id').custom( isValidCategoryId ),
    inputsValidate
], getProductsByCategory);


// obtener producto por id - público
router.get("/:id", [
    check('id', 'no es una id válida').isMongoId(),
    check('id').custom( isValidProductId ),
], getProduct);

// crear un producto - privado con token válido
router.post('/', [
    jwtValidate,
    check('name', 'el nombre del producto es obligatorio').not().isEmpty(),
    check('category', `la categoría del producto no es válida -mongoId`).isMongoId(),
    check('category').custom( isValidCategoryId ),
    inputsValidate,
], createProduct);

// actuualizar producto - privado con token válido
router.put('/:id', [
    jwtValidate,
    // check('category', 'la categoría del producto no es válida').isMongoId(),
    check('id').custom( isValidProductId ),
], updateProduct);

// eliminar producto - privado con token válido - admin
router.delete('/:id', [
    jwtValidate,
    isAdminRole,
    check('id', 'no es una id válida').isMongoId(),
    check('id').custom( isValidProductId ),
], deleteProduct);

module.exports = router;

