'use strict'

var express = require('express');
var TematicaController = require('../controllers/tematica');

 
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/tematica/:id', TematicaController.getTematica);
api.get('/tematica', TematicaController.getTematicas);
api.post('/tematica', TematicaController.saveTematica);

module.exports = api;