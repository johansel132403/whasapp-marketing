

const request = require('request');

const axios = require('axios');

const Chat  = require('../models/chatModel')

const Listado = require('../models/listadoModel');

const {  uploadFileImgCloudinary, deleteImagenCloudinary, uploadFileVideoCloudinary } = require('../services/cloudinary');

const cloudinary = require('cloudinary').v2

var fs = require('fs-extra');

//   let token = "EAAEYkh4JKI0BOxvCWFQMAl8KZBxKLAYXjmEP9Y2S8X4ojURIfePm4vshXwdG9Xl3qNgIVFI9z5hAaEyTFAInQDXcgzDsxFGqojYdZBFS5Oxv5wu34nC8HdOw4b3Xg9KR1zwZBE6GtnESEDWZBlSaSVkwbZA7ihgRkzC7fJvcDmsxzJ69NnkahVfZC4ea4SZA17yERvWWeSblJwp7DVR8ufQV6Y4kthbh1bvjygZD"

 //let token = 'EAAEYkh4JKI0BO7DAVK7ohJB6jm7AgffZBWZBxQM6E6G2uZBzy33kpxrqpuOOrEQ3eYRwgzi5atLWmrLHhmPwq9DC1gSSokvgxZCHgL9eXYOZAkAi5zI16tkpNQw3YAlrP8bBvuYCBqNLZBfYBfYEfY08ZB9lE8vjdID1vqXYRBIoSkmokKZC77LpPGmsoA9G6QhwZB2L2fHAhYLzWNCsZD'



   let token ="EAAEYkh4JKI0BOyj0Rdku04oNZAxrwPSbigWIB5fZCSltgGdXjwR1zv5CfZB5LI5JV1hvO4l3gdcb7eZCzyRGPItezbtQtZARO6ZAtAZAwR4Qu6wrZBKcByZBfSSB6fKt5mZCoJK8wkJ3Hlz7c7AbsQN1etBAlu87DGTQGt1KGPTggSiViTrwG03wfw3OWehL3d6Khqnc6W4Vi7omFuv7jr2gSZC92orwCQZD";
let controllers  = {

    Home: function(req,res){

        res.status(200).send({
            Mensaje:'si todo esta bien !!'
        });
     },



     usuario: async function( req, res ){


            let Chat  = 'MjAyNC0wMi0wMS0x'

        // const process= require('process');
        // process.removeAllListeners('warning');


        const options = {
            url: 'https://odontoartesmilecenter.com/sistema/App/Api/v1/users.php?action=GetUsers',
            headers: {
                Authorization: 'MjAyNC0wMi0wMS0x',
                'Content-type': 'application/json'

            }
          };

          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

            let bd = body.substr()

             let bdParse  = JSON.parse(bd)

             console.log(bdParse)

             setTimeout(()=>{
                 res.status(200).send(
                  bdParse
                 )

             },500)
            }
          }

          request(options, callback);

          

     },


      // crear template//////

      crateTemplate: async function( req, res ){

        try{



          const body =  {
            "name": "seasonal_promotion02",
            "language": "en_US",
            "category": "MARKETING",
            "components": [
              {
                "type": "HEADER",
                "format": "TEXT",
                "text": "Our {{1}} is on!",
                "example": {
                  "header_text": [
                    "Summer Sale"
                  ]
                }
              },
              {
                "type": "BODY",
                "text": "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",
                "example": {
                  "body_text": [
                    [
                      "the end of August","25OFF","25%"
                    ]
                  ]
                }
              },
              {
                "type": "FOOTER",
                "text": "Use the buttons below to manage your marketing subscriptions"
              },
              {
                "type":"BUTTONS",
                "buttons": [
                  {
                    "type": "QUICK_REPLY",
                    "text": "Unsubscribe from Promos"
                  },
                  {
                    "type":"QUICK_REPLY",
                    "text": "Unsubscribe from All"
                  }
                ]
              }
            ]
          }



           let URL  = 'https://graph.facebook.com/v19.0/154271034446024/message_templates'
            // const body = this.parseBody()
            const response = await axios.post(URL,body, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response)

            return response.data
        }catch(e){
            console.log(e)
            return Promise.resolve(e)
        }

      },




      sendTemplate: async function(req, res){

         let body = req.body;

     

        try{


                      // Datos de la solicitud para enviar un mensaje de plantilla
            const data = {
              messaging_product: 'whatsapp',
              to: body.numero,
              type: 'template',
              template: {
                name: body.nombreTamplate,  // Nombre de la plantilla aprobada
                language: {
                  code: body.idioma,  // Código de idioma de la plantilla
                },
              },
            };



           let URL  = 'https://graph.facebook.com/v20.0/208174665722024/messages'
            // const body = this.parseBody()
            const response = await axios.post(URL,data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response)

            return res.status(200).send(response.data) 
        }catch(e){
            console.log(e)
            return Promise.resolve(e)
        }

      },


      receiveMessage: function( req, res ){

       let token = "odontoarte24_happy_small"

       let hub_mode  = '';
       let hub_verify_token = '';
       let hub_challenge = '';


       console.log('entro')

       try {
         if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token){
            res.send(req.query['hub.challenge']);
         }else{
            res.status(400).send("error")
         }

       } catch (error) {
           console.log(error)
       }
      },


      receivPosteMessage: async function( req, res, next){

        // console.log('IN !')
        // let body =     JSON.stringify(req.body)
        // let df = JSON.parse(body);


        // console.log('obj',df.entry[0].changes[0].value.statuses[0].id)
        // console.log('body',body);
        // let d = JSON.parse(JSON.stringify(req.body))
        // console.log('dx',d.entry[0].changes);
        // console.log('xxxxxxxx',JSON.parse(JSON.stringify(req.body)));
        // // console.log("req.Body",body)
        // console.log("entry",body.entry)
        // console.log("req.body.entry[0].changes",req.body.entry[0].changes)


          // Manejar eventos de conexión de WebSocket
         

        // {"object":"whatsapp_business_account","entry":[
        //   {"id":"249865991547503","changes":[{"value":
        //   {"messaging_product":"whatsapp",
        //   "metadata":{"display_phone_number":"18496420776","phone_number_id":"208174665722024"},
        //   "statuses":[{"id":"wamid.HBgLMTgwOTMxOTk5NzAVAgARGBIzQkI4RDFGQ0Q4RDEyOEExMUYA",
        //   "status":"sent",
        //   "timestamp":"1714160518",
        //   "recipient_id":"18093199970",
        //   "conversation":{"id":"9f694bd23d25a5fe59ec2ffeffd921b6","expiration_timestamp":"1714242960",
        //   "origin":{"type":"utility"}},"pricing":{"billable":true,"pricing_model":"CBP","category":"utility"}}]},"field":"messages"}]}]}

        // req.body {"object":"whatsapp_business_account","entry":[{"id":"249865991547503","changes":[{"value":{"messaging_product":"whatsapp","metadata":{"display_phone_number":"18496420776","phone_number_id":"208174665722024"},"contacts":[{"profile":{"name":"Hanck"},"wa_id":"18093199970"}],"messages":[{"from":"18093199970","id":"wamid.HBgLMTgwOTMxOTk5NzAVAgASGBQzQUQzNkQ0MTQwNEVFNDY1N0JCRQA=","timestamp":"1713813794","text":{"body":"B"},"type":"text"}]},"field":"messages"}]}]}

        if(req.body.object){
          // let body =     JSON.stringify(req.body)
          // let obj = JSON.parse(body);

          // // obj.entry[0].changes[0].value.statuses[0].id
          // console.log(obj.entry[0].changes[0].value.statuses[0].recipient_id)
          // console.log(obj.entry[0].changes[0].value.statuses[0].status)
          // console.log(obj.entry[0].changes[0].value.statuses[0].timestamp)

            if( req.body.entry &&
              req.body.entry[0].changes &&            
              req.body.entry[0].changes[0] &&
              req.body.entry[0].changes[0].value.messages &&
              req.body.entry[0].changes[0].value.messages[0] ){

              let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
              let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
              // let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;


              //console.log('Incoming webhook: ' + JSON.stringify(req.body));
              console.log('si entro01')
              let body =     JSON.stringify(req.body)
             
              // console.log('phone_number_id',phone_number_id)
              // console.log('from',from)
              // console.log('msg_body',req.body.entry[0].changes[0].value.messages[0])

              let chat = new Chat();

              if(phone_number_id && from){

                // chat.phone_number_id = phone_number_id;
                // chat.from  = from;
                // chat.msg_body   = msg_body;
                console.log('si entro02')


                  // chat.IdChat = from;
                  // Enviar el mensaje recibido a todos los clientes conectados
                                //  let io = require('../index');
         
                 var date =new Date();
                                    
                  //  let timestamp =  req.body.entry[0].changes[0].value.messages[0].timestamp;
                  //  var datetime = new Date(timestamp * 1000);
                 

                  var hora =  date.toLocaleString('en-US', {timeZone:"America/Santo_Domingo", hour: 'numeric',minute: 'numeric', hour12: true });

               

                  var date =new Date();
                  let fechaCompleta = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            
                  let currentDate = `${hora} - ${fechaCompleta}`




                  const messages = req.body.entry[0].changes[0].value.messages;
                  let imageUrls = [];
                  for (const message of messages) {
                      if (message.type === 'image') {
                          const mediaId = message.image.id;
                          const imageUrl = await controllers.getImageUrl(mediaId);
                          if (imageUrl) {
                              imageUrls.push(imageUrl);
                              console.log(`Imagen recibida: ${imageUrl}`);
                          }
                      }
                  }






                try{
                  let body = [{
                    nombre: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                    messagesID: req.body.entry[0].changes[0].value.messages[0].id,
                   numero:  req.body.entry[0].changes[0].value.messages[0].from,
                    msgText:  req.body.entry[0].changes[0].value.messages[0].text.body,
		             	
                  //  timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,

                    // timestamp: date.toLocaleString('en-US', {timeZone:"America/Santo_Domingo", hour: 'numeric',minute: 'numeric', hour12: true })
                    timestamp: currentDate
              
                  }]

                 chat.IdChat = from;
                  chat.Emisor = body;

                  // const from = req.body;
                  let idd= "";

                  const io = require('../index');

                  console.log('si entro03')
                                 
                                    io.emit('newMessage', { from, body });  




                      // let chats = await Chat.find({"IdChat":req.body.entry[0].changes[0].value.messages[0].from}).exec().then((response)=>{
                      //               return response;
                      // });

                      let update = await Chat.findOneAndUpdate({"IdChat":req.body.entry[0].changes[0].value.messages[0].from},{$push:{"Emisor":body}}).exec().then((response)=>{
                        return response;
                        });

                      if(update !== null){

                      //   let datos = [{
                      //     Nombre: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                      //     messagesID: req.body.entry[0].changes[0].value.messages[0].id,
                      //    numero:  req.body.entry[0].changes[0].value.messages[0].from,
                      //    msgText:  req.body.entry[0].changes[0].value.messages[0].text.body,
                      //    timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
                      //   }]

                      //  chat.IdChat = from;
                      //   chat.Emisor = datos
                     
                      //  let update = await Chat.findOneAndUpdate({"IdChat":req.body.entry[0].changes[0].value.messages[0].from},{$push:{"Emisor":datos}}).exec().then((response)=>{
                      //               return response;
                      //    });

                        //  if(update){
                        //       return res.status(200).send({Mensaje:"Updated !"});

                        //  }
                              return res.status(200).send({Mensaje:"Updated !"});
                       

                      }else{

                                  // let datos = [{
                                  // Nombre: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                                  // messagesID: req.body.entry[0].changes[0].value.messages[0].id,
                                  // numero:  req.body.entry[0].changes[0].value.messages[0].from,
                                  // msgText:  req.body.entry[0].changes[0].value.messages[0].text.body,
                                  // timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
                                  // }]

                                  // chat.IdChat = from;
                                  // chat.Emisor = datos
                              
                                
                                  let  output = await chat.save();
                                  return res.status(200).send({Mensaje:"Saved!"});
                            }
                      }
                  catch(e){
                      console.log(e);
                  };

                            }else{
                              return  res.status( 400 ).send( { Error: "Hay campos que estas vacios " } );
                            }


                              // res.status(200).send(
                              //     JSON.stringify(req.body)
                              // )

                                              // ESTE CODIGO TIENE QUE IR EN OTRA FUNCION NO EN ESTA... INICIO.....
            //   try{

            //     let chats = await Chat.find({"from":req.body.entry[0].changes[0].value.messages[0].from}).exec().then((response)=>{
            //                    return response;
            //     });

            //     console.log("backChat",chats)


            //     // return {
            //     //   Chat: chats,

            //     // }
            // }
            // catch(e){
            //      console.log(e);
            // };
           

            }

      }
      return next()
      },



      
         // Función para obtener la URL de la imagen usando el ID del archivo
           getImageUrl: async function(mediaId) {
          try {
              const response = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return response.data.url;
          } catch (error) {
              console.error('Error obteniendo la URL de la imagen:', error);
              return null;
          }
      },


      saveLista: function( req, res){

        let params = req.body;
        

        let list = new Listado();

         list.nombreLista = params.nombreLista
         list.datos = params.datos

        list.save().then((response)=> {
          return res.status(200).send({response});
        });
            
      
      },



      getLista: function( req, res){
       
  
        Listado.find().then((response)=> {
          return res.status(200).send({response});
        });
            
      
      },

      
      getOneLista: function( req, res){
       
        let paramsId = req.params.id;
  
        Listado.findById(paramsId).then((response)=> {

          if(response){
            return res.status(200).send({response});

          }else{
            return res.status(404).send({Error:"No se encontro ninguna lista...."})
          }
        });
            
      
      },








     
      sendAndSavedMessage: async function( req, res, next){

        
        // if(req.body.IdChat){
        //   // console.log('IdChat',req.body)

        // }


    
    

        let d = false

        if(req.body.IdChat){
       
              // let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
              // let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
              // let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;

              let chat = new Chat(req.body);

              // if(req.body.Emisor && req.body.Emisor[0] && req.body.Emisor[0].nombre
              //    && req.body.Emisor[0] && req.body.Emisor[0].messagesID  &&
              //    req.body.Emisor[0].msgText && req.body.Emisor[0].timestamp
              // ){

              if(req.body.IdChat){

                
                let date =new Date();
                let hora =  date.toLocaleString('en-US', {timeZone:"America/Santo_Domingo", hour: 'numeric',minute: 'numeric', hour12: true });
                let fechaCompleta = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
          
                let currentDate = `${hora} - ${fechaCompleta}`

                console.log(req.body.Emisor[0].numero)
                console.log('ewwr///',req.body)
                console.log('datos///',req.body.Emisor[0].datos)
                // console.log('awlalala',req.body.Emisor[0].data)

                      try{
                              let datos = [{
                              nombre: req.body.Emisor[0].nombre,
                              messagesID: req.body.Emisor[0].messagesID,
                              numero:  req.body.Emisor[0].numero,
                              msgText:  req.body.Emisor[0].msgText,
                              timestamp: req.body.Emisor[0].timestamp,
                              tipo:  req.body.Emisor[0].tipo,
                              datos:req.body.Emisor[0].datos
                           

                              }]

                              
                            console.log('datos', req.body.Emisor[0])

                           
                              
                              
                            let update = await Chat.findOneAndUpdate({"IdChat":req.body.Emisor[0].numero},{$push:{"Emisor":datos}},{ new: true, runValidators: true }).exec().then((response)=>{
                              return response;
                              });

                              if(update !== null){
                                      return res.status(200).send({Mensaje:"Updated !"});

                              }else{
                                                              console.log('esta entrando aqui')     
                                              let chatt = new Chat(req.body);
                                                               
                                          let  output = await chatt.save();

                                          

                                          return res.status(200).send({Mensaje: output});
                                    }
                          }
                      catch(e){
                          console.log('Este es el error: ',e);
                      };

                                }else{
                                  return  res.status( 400 ).send( { Error: "Hay campos que estas vacios " } );
                                }
            

            }else{
              return  res.status( 400 ).send( { Error: "Hay campos que estas vacios " } );
            }
      return next()
        
      },


      getMessage( req, res ){


        let paramsId = req.params.id;

        console.log(paramsId)

        Chat.findOne({"IdChat": paramsId})
            .then((response) =>{

              
           
              if(response){
                return  res.status(200).send(response)
              }else{
                return  res.status(200).send({Error:"No hay Mensajes"})

              }
     


            })

            .catch((err) => {
              console.log(err)
            })

           
  
       
     
      },




      async sendImgByChat( req, res){

        console.log("reqFile",req.files)
      

        let file  = req.files.imagen.mimetype.split('/')
        let nameFile = file[0]
        

        switch (nameFile) {
          case 'image':


            if(req.files?.imagen){
    
              var imgg = {
                  public_id: "",
                  secure_id: ""
              } 
      
              try {
                console.log("reqFile",req.files.imagen.tempFilePath)
                  //listing messages in users mailbox                            
                  var imgRespon = await uploadFileImgCloudinary(req.files.imagen.tempFilePath)

                  console.log('resp: ', imgRespon)
                    
                     imgg = {
                      public_id: imgRespon.public_id,
                      secure_url: imgRespon.secure_url
                  } 

                  if(imgRespon){


 // Optimize delivery by resizing and applying auto-format and auto-quality
 

 
 
                            let chat = new Chat();
 
                            if(imgRespon){
                              
                              // const optimizeUrl = cloudinary.url(imgg.public_id, {
                              //   fetch_format: 'auto',
                              //   quality: 'auto'
                              // });


                              const optimizeUrl = cloudinary.url(imgg.secure_url, {
                                width: 800, // Redimensionar a 800 píxeles de ancho
                                height: 800, // Redimensionar a 800 píxeles de alto
                                crop: 'fit', // Ajustar para encajar en el tamaño especificado
                                quality: 'auto', // Optimizar automáticamente la calidad
                                fetch_format: 'auto' // Determinar automáticamente el formato óptimo (JPEG, PNG, WebP)
                              });



                              console.log('optimizen',optimizeUrl)

                      
                                    try{
                                            let datos = [{
                                              nombre: "Admin",
                                              messagesID:'',
                                            numero:  '',
                                            msgText:  '',
                                            timestamp: '',
                                            imagen:optimizeUrl
                                            }]
              
                                          chat.IdChat = '18093199970';
                                            
                                            
                                          let update = await Chat.findOneAndUpdate({"IdChat":"18093199970"},{$push:{"Emisor":datos}}).exec().then((response)=>{
                                            
                                              return  res.status(200).send(imgg)
                                            
                                            });
              
                                            // if(update !== null){
                                            //         return res.status(200).send({Mensaje:"Updated !"});
              
                                            // }else{
                                            //             let  output = await chat.save();
                                            //             return res.status(200).send({Mensaje:"Saved!"});
                                            //       }
                                        }
                                    catch(e){
                                        console.log(e);
                                    };
              
                                              }else{
                                                return  res.status( 400 ).send( { Error: "Hay campos que estas vacios " } );
                                              }
                          





                  //  return  res.status(200).send(imgg)
                  }
                  console.log('File',imgg)
                  
                  } catch (err) {
                    console.log(err);
                  }
                  
                  await fs.unlink(req.files.imagen.tempFilePath)
                }
            
              break;
        
            case 'video':


            if(req.files?.imagen){
    
              var imgg = {
                  public_id: "",
                  secure_id: ""
              } 
      
              try {
                  //listing messages in users mailbox                            
                  var imgRespon = await uploadFileVideoCloudinary(req.files.imagen.tempFilePath)
                  console.log('Cloudinary: ',imgRespon)
                    
                     imgg = {
                      public_id: imgRespon.public_id,
                      secure_url: imgRespon.secure_url
                  } 
                  
                  } catch (err) {
                    console.log(err);
                  }
      
              await fs.unlink(req.files.imagen.tempFilePath)
                }


            break;

          default:
            break;
        }

      }



      
        
      





}









module.exports = controllers;

// Es posible que los mensajes no estén disponibles. Revisa el problema.....


// tengo que crear una temple
//agegar un usuario
//enviar mensaje a un user   
