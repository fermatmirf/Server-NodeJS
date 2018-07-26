'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TematicaSchema= Schema({
    tema: String,
    titulo: String,
    jornada: {type: Schema.ObjectId, ref: 'Jornada'}
});

module.exports = mongoose.model('Tematica', TematicaSchema);