const { Schema, model } = require('mongoose');

const MunicipalitySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    departament: {
        type: Schema.Types.ObjectId,
        ref: 'Departament',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


MunicipalitySchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Municipality', MunicipalitySchema );