const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { busPost,
    getBuses,
    busPut,
    busDel
} = require('../controllers/bus');

const { userIdExist, busLicensePlatesExist } = require('../helpers/db-validators')

const router = Router();

//get departaments
router.get('/', getBuses);

//post departament
router.post('/', [
    validateJWT,
    check('licensePlates', 'La placa es obligatoria').not().isEmpty(),
    check('licensePlates').custom( busLicensePlatesExist ),
    check('driverAssigned','No es un id de Mongo').isMongoId(),
    check('driverAssigned').custom( userIdExist ),
    validateField
], busPost );

//put
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('licensePlates', 'La placa es obligatoria').not().isEmpty(),
    check('licensePlates').custom( busLicensePlatesExist ),
    check('driverAssigned','No es un id de Mongo').isMongoId(),
    check('driverAssigned').custom( userIdExist ),
    validateField
], busPut );

//delete schedule
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validateField,  
],  busDel);


module.exports = router;