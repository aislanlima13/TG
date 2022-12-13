const mongoose = require('../db/database');

const BedSchema = new mongoose.Schema({

    bedIdentifier: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    clamp: {
        type: mongoose.ObjectId,
        ref: 'clamp'
    },
});

var leito = mongoose.model('bed', BedSchema);

module.exports = leito;
