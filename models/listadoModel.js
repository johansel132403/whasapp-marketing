let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let listaSchema = Schema({

    nombreLista:String,
    datos : [{
        nombre : String,
        numero : String
         }]
     
})

module.exports = mongoose.model('lista',listaSchema);