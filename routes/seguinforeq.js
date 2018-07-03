'use strict'

var express = require('express');
var SegurInf = require('../controllers/seguinforeq');
var api = express.Router();

api.get('/segurInfo',SegurInf.devolverInfo);

module.exports = api;