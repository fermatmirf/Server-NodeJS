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

module.exports = mongoose.model('Follow',FollowSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model('User',UserSchema);
