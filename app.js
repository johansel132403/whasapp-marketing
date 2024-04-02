
let express  = require('express');


// let controllers = require('./controllers/usuario.controller ')

var app = express();
const bodyparse = require('body-parser');



//Cargar alchivos

var usuario_routing = require('./routing/usuario.routing')

//Middlewer
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//CORS
app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS
app.use('/api',usuario_routing  )

//IMPORTS
module.exports = app;