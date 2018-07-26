'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JornadaSchema= Schema({
    nombre: String,
    anio: Number,
    sede: String,
    organizador: { type: Schema.ObjectId, ref: Organizador},
    expositor: {type: Schema.ObjectId, ref: 'User'},
    tematica: {type: Schema.ObjectId, ref: 'User'},
    contacto: String
});

module.exports = mongoose.model('Jornada',JornadaSchema);

