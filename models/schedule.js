const { Schema, model } = require('mongoose');

const ScheduleSchema = Schema({
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    detail: [
        {
            driverAssigned:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            departureTime:{
                type: String,
                required: [true, 'La hora de inicio es obligatoria']
            },
            returnTime: {
                type: String,
            }
        }
    ],
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


ScheduleSchema.methods.toJSON = function() {
    const { __v, status, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Schedule', ScheduleSchema );