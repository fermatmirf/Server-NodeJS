'use strict'

var Organizador = require('../models/organizador');

function saveOrganizador(req, res){
    var params = req.body;

    if(params.nombre && params.url){
        var organizador = new Organizador();
        organizador.nombre = params.nombre;
        organizador.url = params.url;
        organizador.save((err,organizadorStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la organizador'});
            if(!organizadorStored) return res.status(404).send({message: 'La organizador no se ha guardado'});
            return res.status(200).send({organizador: organizadorStored});
        });
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }
}
function getOrganizador(req, res){
    var organizadorId = req.params.id;
    Organizador.findById(organizadorId,(err, organizador) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!organizador) return res.status(404).send({message: 'El organizador no existe'});
        return res.status(200).send({organizadores:organizador});
    });
}
function getOrganizadores(req, res){
    Organizador.find({},(err, organizadores) => {
        if(organizadores) res.status(200).send({organizadores:organizadores});
    });
}

module.exports = {
    saveOrganizador,
    getOrganizador,
    getOrganizadores
}