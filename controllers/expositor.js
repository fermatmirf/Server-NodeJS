'use strict'

var Expositor = require('../models/expositor');

function saveExpositor(req, res){
    var params = req.body;
    console.log(params);
    
    if(params.nombre && params.apellido && params.procedencia){
        var expositor = new Expositor();
        expositor.nombre = params.nombre;
        expositor.apellido = params.apellido;
        expositor.procedencia = params.procedencia;
        expositor.save((err,expositorStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la expositor'});
            if(!expositorStored) return res.status(404).send({message: 'El expositor no se ha guardado'});
            return res.status(200).send({expositor: expositorStored});
        });
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }
}
function getExpositor(req, res){
    var expositorId = req.params.id;
    Expositor.findById(expositorId,(err, expositor) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!expositor) return res.status(404).send({message: 'El expositor no existe'});
        return res.status(200).send({expositores:expositor});
    });
}
function getExpositores(req, res){
    Expositor.find({},(err, expositores) => {
        if(expositores) res.status(200).send({expositores:expositores});
    });
}

module.exports = {
    saveExpositor,
    getExpositor,
    getExpositores
}