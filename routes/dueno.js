'use strict'

var express = require('express');
var DuenoController = require('../controllers/dueno');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/duenos'});

api.get('/getDueno/:id', md_auth.ensureAuth, DuenoController.getDueno);
api.get('/getDuenos', md_auth.ensureAuth, DuenoController.getDuenos);
api.post('/saveDueno', md_auth.ensureAuth, DuenoController.saveDueno);

module.exports = api;