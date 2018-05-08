'use strict'

var Persona = require('../models/persona');

function savePersona(req, res){
    var params = req.body;

    if(params.nombre && params.apellido && params.fechanacimiento && params.dni){
        var persona = new Persona();
        persona.nombre = params.nombre;
        persona.apellido = params.apellido;
        persona.fechanacimiento = params.fechanacimiento;
        persona.dni = params.dni;
        
        persona.save((err,personaStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar la persona'});
            if(!personaStored) return res.status(404).send({message: 'La persona no se ha guardado'});
            return res.status(200).send({persona: personaStored});
        });
    }
}
module.exports = {
    savePersona
}