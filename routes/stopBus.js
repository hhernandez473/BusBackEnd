const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const { stopBusPost,
    getStopBus
} = require('../controllers/stopBus');

const { routeExist } = require('../helpers/db-validators');

const router = Router();

//get stopBus
router.get('/', getStopBus);

//post stopBus
router.post('/', [
    validateJWT,
    check('route','No es un id de Mongo').isMongoId(),
    check('detail.*.name', 'El nombre de la parada de bus es obligatoria').not().isEmpty(),
    check('detail.*.latitude', 'La latitude es obligatoria').not().isEmpty(),
    check('detail.*.longitude', 'La longitude es obligatoria').not().isEmpty(),
    //check('route').custom( routeExist ),
    validateField
],  stopBusPost);

module.exports = router;