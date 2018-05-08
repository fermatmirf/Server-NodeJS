'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;
// Conexión Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Curso_mean_social')
        .then(() =>{
            console.log("La conexión a la base de datos curs_mean_social se ha realizado correctamente")
        
            var server = app.listen(port, () => {
                console.log("Servidor corriendo en http://localhost:3800");
            });
        })
        .catch(err => console.log(err));
