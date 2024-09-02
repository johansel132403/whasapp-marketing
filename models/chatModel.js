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
    }],


   

    
})

module.exports = mongoose.model('chat',userSchema);



const UserModel = mongoose.model('chat',userSchema);

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://odontoarte24:odontoarte24@cluster0.tvfjxum.mongodb.net/whatsappmarketing', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos.');
        return true;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return false;
    }
}


 async function migrateData() {

    const connected = await connectToDatabase();
    if (!connected) {
        console.error('No se pudo conectar a la base de datos. Abortando la migración.');
        return;
    }


    try {
        // Encuentra todos los documentos que necesitan ser migrados
       
        const users  = await UserModel.find();
  
        // Recorrer cada documento para actualizarlo
        for (let user of users ) {
            let updated = false;

            console.log('********* ',user)
  
            // Verifica y añade nuevos campos o modifica los existentes
            user.Emisor.forEach(emisor => {
                
                if (!emisor.type) {
                    emisor.type = '';
                    updated = true;
                }
                
                if (!emisor.data) {
                    emisor.data = []; // Añadir un array vacío si no existe
                    updated = true;
                }
            });
  
            // Si se ha hecho algún cambio, guarda el documento
            if (updated) {
                await user.save();
                console.log(`Documento con IdChat ${user.IdChat} actualizado.`);
            }
        }
  
        console.log('Migración completada.');
    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        mongoose.connection.close(); // Cierra la conexión a la base de datos
    }
  }
  
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


// Ejecuta la migración
migrateData();

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