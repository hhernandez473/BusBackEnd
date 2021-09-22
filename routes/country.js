const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { countryPost,
    getCountries
} = require('../controllers/country');

const { countryExist } = require('../helpers/db-validators')

const router = Router();

//get countrys
router.get('/', getCountries);

//post country
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], countryPost );

module.exports = router;