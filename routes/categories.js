const { Router } = require("express");
const { check } = require("express-validator");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categories");
const { isValidCategoryId } = require("../helpers/db-validators");

const { inputsValidate } = require("../middlewares/inputs-validate");
const jwtValidate = require("../middlewares/jwtValidate");
const { isAdminRole } = require("../middlewares/roleValidate");

const router = Router();

// obtener todas las categorias - público
router.get("/", getCategories);

// obtener una categoria por id - público
router.get("/:id",[
    check('id', 'no es una id válida').isMongoId(),
    check('id').custom( isValidCategoryId ),
    inputsValidate
] ,getCategory);

// crear una categoria - privado con token válido
router.post('/', [
    jwtValidate,
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    inputsValidate
] , createCategory);

// actualizar una categoria - privado con token válido
router.put('/:id', [
    jwtValidate,
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('id').custom( isValidCategoryId ),
    inputsValidate
], updateCategory);

// eliminar una categoria - privado con token válido - admin
router.delete('/:id',[
    jwtValidate,
    isAdminRole,
    check('id', 'no es una id válida').isMongoId(),
    check('id').custom( isValidCategoryId ),
    inputsValidate
] ,deleteCategory);



module.exports = router;