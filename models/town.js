const { Schema, model } = require('mongoose');

const TownSchema = Schema({
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
    municipality: {
        type: Schema.Types.ObjectId,
        ref: 'Municipality',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


TownSchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Town', TownSchema );