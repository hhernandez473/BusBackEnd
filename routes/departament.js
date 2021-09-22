const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { departamentPost,
    getDepartaments
} = require('../controllers/departament');

const { countryExist } = require('../helpers/db-validators')

const router = Router();

//get departaments
router.get('/', getDepartaments);

//post departament
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('country','No es un id de Mongo').isMongoId(),
    check('country').custom( countryExist ),
    validateField
], departamentPost );

module.exports = router;