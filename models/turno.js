'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnoSchema = Schema({
    desdehora: String,
    hastahora: String
});

module.exports = mongoose.model('Turno',TurnoSchema);

