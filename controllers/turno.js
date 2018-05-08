'use strict'

var Turno = require('../models/turno');

function saveTurno(req, res){
    var params = req.body;
    if(params.desdehora && params.hastahora){
        var turno = new Turno();
        turno.desdehora = params.desdehora;
        turno.hastahora = params.hastahora;
        turno.save((err, turnoStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el turno'});
            if(!turnoStored) return res.status(404).send({message: 'El turno no se ha guardado'});
            return res.status(200).send({turno:turnoStored}); 
        });
    }
}
module.exports = {
    saveTurno
}