const { Schema, model } = require('mongoose');

const CheckInSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imgName: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    }
});

module.exports = model('CheckIn', CheckInSchema);
