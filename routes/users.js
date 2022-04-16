const { Router } = require('express');
const { getUsers, postUsers, putUsers, patchUsers, deleteUsers } = require('../controllers/users');
const {check} = require('express-validator');
const { inputsValidate } = require('../middlewares/inputs-validate');
const { isValidRole, mailExist, isValidId } = require('../helpers/db-validators');
const jwtValidate = require('../middlewares/jwtValidate');
const {isAdminRole, haveRole} = require('../middlewares/roleValidate');

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('email').custom( mailExist),  
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña debe tener al menos 6 carácteres').isLength({ min: 6 }),
    check('role').custom( isValidRole ),
    inputsValidate
], postUsers);
router.put('/:id',[
    check('id', 'no es una id válida').isMongoId(),
    check('id', 'el id no existe').custom( isValidId ),
    check('role').custom( isValidRole ),
    inputsValidate
] ,putUsers);
router.patch('/', patchUsers);
router.delete('/:id', [
    jwtValidate,
    //isAdminRole,
    haveRole('ADMIN_ROLE', 'USE_ROLE'),
    check('id', 'no es una id válida').isMongoId(),
    check('id', 'el id no existe').custom( isValidId ),
    inputsValidate
]
, deleteUsers);




module.exports = router;