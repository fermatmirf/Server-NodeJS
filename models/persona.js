'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var PersonaSchema = Schema({
    nombre: String,
    apellido: String,
    fechanacimiento: String,
    dni: String,
});

module.exports = mongoose.model('Persona',PersonaSchema);
