
let mongoose = require('mongoose');
let app = require('./app');
require('dotenv').config({path: 'variable.env'});
let port = process.env.PORT || 3000;
//ESTO ES PARA CONECTARNOS A MONGOOSE POR MEDIO DE LAS PROMESAS
// mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify',false);

let connection = require('./controllers/connection') 

 let socketio  = require('socket.io')

let server = app.listen(port,'0.0.0.0',()=>{
    console.log(port)
    console.log('El puerto de 3700, ya esta listo..');
})    


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true } )
        .then(()  =>{
               console.log(" La conexion a la bd se ha realizado correctamente !! ")
             
             
        })
        .catch( err => console.log(err))  

// var io =  socketio(server,{
//     cors:{
//         origins:['http://localhost:4200','http://localhost'],
//         methods: ["GET", "POST"],
       
//     },

//     forceNew: true,
//     transports: ["polling"],   //https://stackoverflow.com/questions/49575350/websocket-connection-to-wss-error-during-websocket-handshake-unexpected-re
    
// })
// let soc  = require('./controllers/usuario.controller');


// soc.receivPosteMessage(io)



 module.exports = io;










// mongoose.connect('mongodb://localhost:27017/Social-Network', { useNewUrlParser: true ,  useUnifiedTopology: true })
//         .then(()=>{
//             console.log('connect al puerto de mongodb..');
//         }).catch((e)=>{
//             console.log(e);
//         });