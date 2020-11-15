const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    ci: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    additionalInformation: {
        address: {
            type: String,
            required: true
        },
        copyVerification: {
            type: Boolean,
            required: true
        },
        cellphone: {
            type: Number,
            required: false
        },
        telephone: {
            type: Number,
            required: false
        },
        refContact: {
            type: Number,
            required: false
        }
    }
});

module.exports = model('User', UserSchema);
