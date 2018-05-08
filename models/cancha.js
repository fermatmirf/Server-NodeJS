'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var CanchaSchema = Schema({
    nombre: String,
    numero: Number,
    imagen: String,
    estado: {
        type: String,
        enum: ['Para Jugar','En Reparacion'],
        required: true
    },
    establecimiento: {type: Schema.ObjectId, ref:'Establecimiento'}
});
CanchaSchema.plugin(timestamps);
module.exports = mongoose.model('Cancha', CanchaSchema);