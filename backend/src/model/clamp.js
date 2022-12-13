const mongoose = require('../db/database');

const ClampSchema = new mongoose.Schema({

    m: {
        type: String,
        required: true,
    },

    s: {
        type: String,
        required: false,
        default: 0
    },
    
    statusDescription: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: false,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updateAt: {
        type: String,
        required: false
    },
});

var clamp = mongoose.model('clamp', ClampSchema);

module.exports = clamp;
