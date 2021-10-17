const { Router } = require('express');
const { check } = require('express-validator');

const { isAdminRole, validateJWT, validateField } = require('../middlewares');

const {
    getSchedule,
    getSchedules,
    schedulePost
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


//post schedule
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( scheduleExist ),
    check('route').custom( routeExistSchedule ),
    validateField
],  schedulePost);

module.exports = router;