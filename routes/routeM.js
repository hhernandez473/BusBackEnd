const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { routePost,
    getRoute
} = require('../controllers/routerM');

const { townExist } = require('../helpers/db-validators');
const route = require('../models/route');

const router = Router();

//get route
router.get('/', getRoute);

//post route
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('town','No es un id de Mongo').isMongoId(),
    check('town').custom( townExist ),
    validateField
],  routePost);

module.exports = router;