'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DuenoSchema = Schema({
    persona: {type: Schema.ObjectId, ref: 'Persona'},
    cuit: String,
    imagen: String,
    
});

module.exports = mongoose.model('Dueno', DuenoSchema);