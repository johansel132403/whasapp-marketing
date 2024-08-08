
let express  = require('express');
const bodyparse = require('body-parser');

let fileUpload = require('express-fileupload');

// let controllers = require('./controllers/usuario.controller ')

var app = express();




//Cargar alchivos

var usuario_routing = require('./routing/usuario.routing')


// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb',}));
//Middlewer
app.use(bodyparse.urlencoded({extended:false,limit: '50mb'}));
app.use(bodyparse.json({limit: '50mb'}));

  //Middlewares 
  app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './uploadss'
  }));

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