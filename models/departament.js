const { Schema, model } = require('mongoose');

const DepartamentSchema = Schema({
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
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


DepartamentSchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Departament', DepartamentSchema );