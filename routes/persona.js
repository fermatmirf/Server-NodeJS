'use strict'

var express = require('express');
var personaController = require ('../controllers/persona');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/personas'});

api.post('/savePersona', md_auth.ensureAuth, personaController.savePersona);

module.exports = api;