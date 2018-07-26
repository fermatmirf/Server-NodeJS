'use strict'

var express = require('express');
var OrganizadorController = require('../controllers/organizador');

 
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/organizador/:id', OrganizadorController.getOrganizador);
api.get('/organizador', OrganizadorController.getOrganizadores);
api.post('/organizador', OrganizadorController.saveOrganizador);

module.exports = api;