'use strict '

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EstablecimientoSchema = Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    celular: String,
    dueno: {type: Schema.ObjectId, ref: 'Dueno'}
});

module.exports = mongoose.model('Establecimiento', EstablecimientoSchema);