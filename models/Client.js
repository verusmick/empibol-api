const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
    name: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true        
    },
    technicalDetails: {
        type: String,
        required: true
    },    
    address: {
        type: String,
        required: true
    },    
    cellphone: {
        type: Number,
        required: false
    }    
});

module.exports = model('Client', ClientSchema);
