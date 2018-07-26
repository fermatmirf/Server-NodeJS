'use strict'

var Tematica = require('../models/tematica');

function saveTematica(req, res){
    var params = req.body;

    if(params.tema && params.titulo){
        var tematica = new Tematica();
        tematica.tema = params.tema;
        tematica.titulo = params.titulo;
        tematica.save((err,tematicaStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la tematica'});
            if(!tematicaStored) return res.status(404).send({message: 'La tematica no se ha guardado'});
            return res.status(200).send({tematica: tematicaStored});
        });
    }else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }
}
function getTematica(req, res){
    var tematicaId = req.params.id;
    Tematica.findById(tematicaId,(err, tematicas) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!tematicas) return res.status(404).send({message: 'La tematica no existe'});
        return res.status(200).send({tematicas:tematicas});
    });
}
function getTematicas(req, res){
    Tematica.find({},(err, tematicas) => {
        if(tematicas) res.status(200).send({tematicas:tematicas});
    });
}

module.exports = {
    saveTematica,
    getTematica,
    getTematicas
}