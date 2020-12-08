const { Schema, model } = require('mongoose');

const CheckInOutSchema = Schema({
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
    type: {
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

module.exports = model('CheckInOut', CheckInOutSchema);
