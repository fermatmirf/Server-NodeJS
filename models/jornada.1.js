'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var JornadaSchema= Schema({
    nombre: String,
    anio: String,
    sede: String,
    organizadores:[{type: Schema.ObjectId, ref:'Organizador'}],
    expositores:[{type: Schema.ObjectId, ref:'Expositor'}],
    tematicas:[{type: Schema.ObjectId, ref:'Tematica'}],
    user: {type: Schema.ObjectId, ref: 'User'},
});
JornadaSchema.plugin(timestamps);

module.exports = mongoose.model('Jornada', JornadaSchema);