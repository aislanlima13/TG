const mongoose = require('../db/database');

const UsuarioSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    user: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    branch: {
        type: String,
        require: true,
    },

    occupation: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});

var usuario = mongoose.model('usuario', UsuarioSchema);

module.exports = usuario;
