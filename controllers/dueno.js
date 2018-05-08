'use strict'

var Dueno = require('../models/dueno');
var Persona = require('../models/persona');

function saveDueno(req, res){
    var params = req.body;
    
    if(params.cuit){
        var dueno = new Dueno();
        dueno.cuit = params.cuit;
        dueno.persona = params.persona;
        dueno.save((err, duenoStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el dueno'});
            if(!duenoStored) return res.status(404).send({message: 'El dueno no se ha guardado'});
            return res.status(200).send({dueno:duenoStored});
        });
    }
}

function getDueno(req, res){
    var duenoId = req.params.id;
    Dueno.findById(duenoId,(err, dueno) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!dueno) return res.status(404).send({message: 'El dueno no existe'});
        return res.status(200).send({dueno});
    });
}
function getDuenos(req, res){
    Dueno.find({},(err, duenos) => {
        if(duenos){
            Persona.populate(duenos,{path:'persona'},(err,duenos) => {
                res.status(200).send(duenos);
            });
        }      
    });
}
module.exports = {
    saveDueno,
    getDueno,
    getDuenos
}