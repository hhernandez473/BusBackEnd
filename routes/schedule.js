const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const {
    getSchedule,
    getSchedules,
    schedulePost,
    schedulePut,
    scheduleDel,
    getScheduleXRoute
} = require('../controllers/schedule');

const { scheduleExist, routeExistSchedule } = require('../helpers/db-validators');
const schedule = require('../models/schedule');

const router = Router();

//get schedules
router.get('/', getSchedules);

//get Schedule
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validateField
], getSchedule);

//get Schedule Route
router.get('/route/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('route').custom(routeExistSchedule),
    validateField
], getScheduleXRoute);


//post schedule
router.post('/', [
    validateJWT,
    check('route').custom(routeExistSchedule),
    check('detail.*.driverAssigned', 'Debe asignar un conductor').not().isEmpty(),
    check('detail.*.driverAssigned', 'Debe asignar un conductor').isMongoId(),
    check('detail.*.departureTime', 'La hora de salida es obligatoria').not().isEmpty(),
    check('detail.*.returnTime', 'La hora de salida es obligatoria').not().isEmpty(),
    validateField
], schedulePost);

//put schedule
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(scheduleExist),
    check('detail.*.driverAssigned', 'Debe asignar un conductor').not().isEmpty(),
    check('detail.*.driverAssigned', 'Debe asignar un conductor').isMongoId(),
    check('detail.*.departureTime', 'La hora de salida es obligatoria').not().isEmpty(),
    check('detail.*.returnTime', 'La hora de salida es obligatoria').not().isEmpty(),
    validateField
], schedulePut);

//delete schedule
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( scheduleExist ),
    validateField,  
],  scheduleDel);

module.exports = router;