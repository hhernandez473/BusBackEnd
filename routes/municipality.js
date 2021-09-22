const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { municipalityPost,
    getMunicipality
} = require('../controllers/municipality');

const { departamentExist } = require('../helpers/db-validators')

const router = Router();

//get departaments
router.get('/', getMunicipality);

//post departament
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('departament','No es un id de Mongo').isMongoId(),
    check('departament').custom( departamentExist ),
    validateField
], municipalityPost );

module.exports = router;