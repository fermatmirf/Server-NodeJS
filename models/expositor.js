'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpositorSchema= Schema({
    nombre: String,
    apellido: String,
    procedencia: String,
    jornada: {type: Schema.ObjectId, ref: 'Jornada'}
});

module.exports = mongoose.model('Expositor', ExpositorSchema);