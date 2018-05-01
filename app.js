//'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var MongoStore = require('connect-mongo')(session);

var MONGOURL = 'mongodb://localhost:27017/Curso_mean_social';
//cargar rutas
var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: "asd123",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: MONGOURL,
        autoReconnect: true
    })
}));

//cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});
//rutas
app.get('/',(req,res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1; 
    res.send(`Hola hsas visto esta pagina: ${req.session.cuenta}`)
});
app.use('/api',user_routes);
app.use('/api',follow_routes);

/*app.get('/', (req,res) =>{
    res.status(200).send({
        message: 'Hola mundo desde el servidor de NodeJS'
    });
});
app.get('/pruebas', (req,res) =>{
    res.status(200).send({
        message: 'Acción de pruebas en el servidor de NodeJS'
    });
});*/

//exportar
module.exports = app;