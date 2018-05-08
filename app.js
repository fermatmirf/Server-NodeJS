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
var cancha_routes = require('./routes/cancha');
var establecimiento_routes = require('./routes/establecimiento');
var dueno_routes = require('./routes/dueno');
var persona_routes = require('./routes/persona');
var turno_routes = require('./routes/turno');
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
app.use('/api',cancha_routes);
app.use('/api',establecimiento_routes);
app.use('/api',dueno_routes);
app.use('/api',persona_routes);
app.use('/api',turno_routes);

//exportar
module.exports = app;