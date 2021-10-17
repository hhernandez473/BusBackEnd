const { Schema, model } = require('mongoose');

const StopBusSchema = Schema({
    
    detail: [
        
        {
            name: {
                type: String,
                required: [true, 'El nombre es obligatorio'],
                unique: true
            },
            latitude:{
                type: Number,
                required: [true, 'La latitude es obligatoria']
            },
            longitude: {
                type: Number,
                required: [true, 'La longitude es obligatoria']
            }
        }
    ],
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


StopBusSchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'StopSchema', StopBusSchema );