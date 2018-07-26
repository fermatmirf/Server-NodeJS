'use strict'

var express = require('express');
var JornadaController = require('../controllers/jornada');

 
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/jornada/:id', JornadaController.getJornada);
api.get('/jornada', JornadaController.getJornadas);
api.post('/jornada',md_auth.ensureAuth ,JornadaController.saveJornada);

module.exports = api;