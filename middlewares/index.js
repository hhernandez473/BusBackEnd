const validateJWT = require('../middlewares/validate-jwt');
const validateField = require('../middlewares/validate-field')
const validateRoles = require('../middlewares/validate-role');

module.exports = {
    ...validateJWT,
    ...validateField,
    ...validateRoles,
}