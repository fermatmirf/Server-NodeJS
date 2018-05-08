'use strict'

var express = require('express');
var EstablecimientoController = require ('../controllers/establecimiento');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/establecimientos'});

api.get('/getEstablecimiento/:id', md_auth.ensureAuth, EstablecimientoController.getEstablecimiento);
api.get('/getEstablecimientos',md_auth.ensureAuth, EstablecimientoController.getEstablecimientos);
api.post('/saveEstablecimiento', md_auth.ensureAuth, EstablecimientoController.saveEstablecimiento);

module.exports = api;