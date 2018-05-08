'use strict'

var Establecimiento = require('../models/establecimiento');
var Dueno = require('../models/dueno');
var Persona = require('../models/persona');

function saveEstablecimiento(req, res){
    var params = req.body;

    if(params.nombre && params.direccion && params.telefono && params.celular){
        var establecimiento = new Establecimiento();
        establecimiento.nombre = params.nombre;
        establecimiento.direccion = params.direccion;
        establecimiento.telefono = params.telefono;
        establecimiento.celular = params.celular;
        establecimiento.dueno = params.dueno;
        establecimiento.save((err, establecimientoStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el establecimiento'});
            if(!establecimientoStored) return res.status(404).send({message: 'El establecimiento no se ha guardado'});
            return res.status(200).send({establecimiento: establecimientoStored});
        });
    }
}

function getEstablecimiento(req, res){
    var establecimientoId = req.params.id;
    console.log(establecimientoId);
    
    Establecimiento.findById(establecimientoId).populate({
        path: 'dueno',
        populate: { path: 'persona',
                    model: 'Persona'        
    }
    }).exec((err, establecimiento)=>{
        console.log(establecimiento);
        
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!establecimiento) return res.status(404).send({message: 'El establecimiento no existe'});
        return res.status(200).send({establecimiento});
    });
}

function getEstablecimientos(req, res){
    /*Establecimiento.find({}, (err, establecimientos) => {
        if(establecimientos){
            Dueno.populate(establecimientos,{path:'dueno'},(err,establecimientos) => {
                console.log(establecimientos);
                
                Persona.populate(establecimientos,{path: 'Persona'},(err, establecimientos) =>{
                    console.log('aa'+establecimientos);
                    
                    res.status(200).send(establecimientos);    
                });
            });            
        }
    });*/
    Establecimiento.find({}).populate({
        path: 'dueno',
        populate: { path: 'persona',
                    model: 'Persona'        
    }
    }).exec((err, establecimientos)=>{
        res.status(200).send(establecimientos);
    });
}

module.exports = {
    saveEstablecimiento,
    getEstablecimiento,
    getEstablecimientos
}
