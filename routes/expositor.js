'use strict'

var express = require('express');
var ExpositorController = require('../controllers/expositor');

 
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/expositor/:id', ExpositorController.getExpositor);
api.get('/expositor', ExpositorController.getExpositores);
api.post('/expositor', ExpositorController.saveExpositor);

module.exports = api;