let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let userSchema = Schema({

    // phone_number_id:String,
    // from:String,
    // msg_body:String,

    IdChat: String,   
    Emisor:[{
        nombre: String,
        messagesID:String,
        numero: String,             
        msgText: String,
        timestamp: String,
        imagen: String,
    }],
    type:String,
    data:[{
        nombre: String,
        header: String,             
        imagen: String,
        body: String,
        timestamp: String,
        foote:String,
        bottom:String,
    }],


   

    
})

module.exports = mongoose.model('chat',userSchema);

// let IdChat = from;
// console.log("Idchat:",IdChat)
// let nombre = req.body.entry[0].changes[0].value.contacts[0].profile.name;
// console.log("nombre:",nombre)
// let  messagesID = req.body.entry[0].changes[0].value.messages[0].id;
// console.log("messagesID:",messagesID)
// let numero = req.body.entry[0].changes[0].value.messages[0].from;
// console.log("numero:",numero)
// let msgText = req.body.entry[0].changes[0].value.messages[0].text;
// console.log("msgText:",msgText)
// let timestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
// console.log("timestamp:",timestamp)
// let recptor = req.body.entry[0].changes[0].value.metadata.display_phone_number;



// {"object":"whatsapp_business_account",
// "entry":[
//     {
//         "id":"249865991547503",
//         "changes":[
//             { "value":
//                { "messaging_product":"whatsapp",
//                  "metadata":
//                  { "display_phone_number":"18496420776",
//                     "phone_number_id":"208174665722024" },
//                     "contacts":[
//                         { "profile":{"name":"Hanck"},
//                            "wa_id":"18093199970"}],
//                             "messages":[
//                                 { "from":"18093199970",
//                                   "id":"wamid.HBgLMTgwOTMxOTk5NzAVAgASGBQzQTRBM0VCNTNBQjNGOTUyMTMwOAA=",
//                                   "timestamp":"1715800580",
//                                   "text":{"body":"Lo"},
//                                   "type":"text"}]},
//                                   "field":"messages"}]}]}




// IdChat : un id para ambos, que sera el numero del cliente
// nombre

// text[send:{
//     emisor:{
     //    messagesID
        // numero
//         profileName,
//         wa_id,
      //   msgText
        // timestamp
//     }
//    receptor:{
     // numero,

//    }
// }]