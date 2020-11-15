const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    resources: [{
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false
        }
    }]
});

module.exports = model('Role', RoleSchema);
