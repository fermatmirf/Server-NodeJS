'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnoCanchaSchema = Scheam({
    cancha: {type: Schema.ObjectId, ref: 'Cancha'},
    turno: {type: Schema.ObjectId, ref: 'Turno'}
});

module.exports = mongoose.model('TurnoCancha', TurnoCanchaSchema);