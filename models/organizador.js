'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizadorSchema= Schema({
    nombre: String,
    url: String,
});

module.exports = mongoose.model('Organizador', OrganizadorSchema);