'use strict'

var express = require('express');
var TurnoController = require('../controllers/turno');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/saveTurno',md_auth.ensureAuth,TurnoController.saveTurno);

module.exports = api;