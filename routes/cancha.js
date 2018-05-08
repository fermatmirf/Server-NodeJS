'use strict'

var express = require('express');
var CanchaController = require('../controllers/cancha');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/canchas'});

api.get('/getCancha/:id', md_auth.ensureAuth, CanchaController.getCancha);
api.get('/getCanchas', md_auth.ensureAuth, CanchaController.getCanchas);
api.post('/saveCancha', md_auth.ensureAuth, CanchaController.saveCancha);

module.exports = api;