const { Schema, model } = require('mongoose');

const RouteSchema = Schema({
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
    town: {
        type: Schema.Types.ObjectId,
        ref: 'Town',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


RouteSchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Route', RouteSchema );