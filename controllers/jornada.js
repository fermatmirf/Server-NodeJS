'use strict'

var Jornada = require('../models/jornada.1');

function saveJornada(req, res){
    var params = req.body;
    console.log(params);
    
    if(params.nombre && params.anio && params.sede && params.organizadores && params.expositores && params.tematicas && params.contacto && params.user){
        var jornada = new Jornada();
        jornada.nombre = params.nombre;
        jornada.anio = params.anio;
        jornada.sede = params.sede;        
        jornada.organizadores = params.organizadores; 
        jornada.expositores = params.expositores;
        jornada.tematicas = params.tematicas;
        jornada.contacto = params.contacto;
        jornada.user = params.user;
        jornada.save((err,jornadaStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la jornada'});
            if(!jornadaStored) return res.status(404).send({message: 'La jornada no se ha guardado'});
            return res.status(200).send({jornada: jornadaStored});
        });
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }
}
function getJornada(req, res){
    var jornadaId = req.params.id;
    Jornada.findById(jornadaId).populate("organizadores expositores tematicas").exec().then( jornada => {
        if(!jornada) return res.status(404).send({message: 'La jornada no existe'});
        return res.status(200).send({jornada});
    }).catch( err => {
        return res.status(500).send({message: 'Error en la peticion'});
    });/* ,(err, jornada) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!jornada) return res.status(404).send({message: 'La jornada no existe'});
        return res.status(200).send({jornada});
    }); */
}
function getJornadas(req, res){
    Jornada.find({},(err, jornadas) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        if(!jornadas) return res.status(404).send({message: 'No existen jornadas registradas'});
        return res.status(200).send({jornadas : jornadas});
    });
}

module.exports = {
    saveJornada,
    getJornada,
    getJornadas
}