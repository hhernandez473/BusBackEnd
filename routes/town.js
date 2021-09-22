const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { townPost,
    getTown
} = require('../controllers/town');

const { municipalityExist } = require('../helpers/db-validators');
const town = require('../models/town');

const router = Router();

//get town
router.get('/', getTown);

//post town
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('municipality','No es un id de Mongo').isMongoId(),
    check('municipality').custom( municipalityExist ),
    validateField
],  townPost);

module.exports = router;