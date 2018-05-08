'use strict'

var Cancha = require('../models/cancha');
var Establecimiento = require('../models/establecimiento');

function saveCancha(req, res){
    var params = req.body;

    if(params.nombre && params.numero && params.estado && params.establecimiento){
        var cancha = new Cancha();
        cancha.nombre = params.nombre;
        cancha.numero = params.numero;
        cancha.estado = params.estado;
        cancha.establecimiento = params.establecimiento;
        cancha.save((err,canchaStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la cancha'});
            if(!canchaStored) return res.status(404).send({message: 'La cancha no se ha guardado'});
            return res.status(200).send({cancha: canchaStored});
        });
    }
}
function getCancha(req, res){
    var canchaId = req.params.id;
    Cancha.findById(canchaId,(err, cancha) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!cancha) return res.status(404).send({message: 'La cancha no existe'});
        return res.status(200).send({cancha});
    });
}
function getCanchas(req, res){
    Cancha.find({},(err, canchas) => {
        if(canchas)
        Establecimiento.populate(canchas,{path:'establecimiento'},(err,canchas) => {
            res.status(200).send(canchas);
        });      
    });
}
module.exports = {
    saveCancha,
    getCancha,
    getCanchas
}