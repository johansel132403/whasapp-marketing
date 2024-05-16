

const request = require('request');

const axios = require('axios');

const Chat  = require('../models/chatModel')

const Listado = require('../models/listadoModel');

//   let token = "EAAEYkh4JKI0BOxvCWFQMAl8KZBxKLAYXjmEP9Y2S8X4ojURIfePm4vshXwdG9Xl3qNgIVFI9z5hAaEyTFAInQDXcgzDsxFGqojYdZBFS5Oxv5wu34nC8HdOw4b3Xg9KR1zwZBE6GtnESEDWZBlSaSVkwbZA7ihgRkzC7fJvcDmsxzJ69NnkahVfZC4ea4SZA17yERvWWeSblJwp7DVR8ufQV6Y4kthbh1bvjygZD"

 //let token = 'EAAEYkh4JKI0BO7DAVK7ohJB6jm7AgffZBWZBxQM6E6G2uZBzy33kpxrqpuOOrEQ3eYRwgzi5atLWmrLHhmPwq9DC1gSSokvgxZCHgL9eXYOZAkAi5zI16tkpNQw3YAlrP8bBvuYCBqNLZBfYBfYEfY08ZB9lE8vjdID1vqXYRBIoSkmokKZC77LpPGmsoA9G6QhwZB2L2fHAhYLzWNCsZD'

//  let io = require('../index');


   let token ="EAAEYkh4JKI0BO5N27NOZC5JVqqLKiNDKXjeY900hhIMIZB7swxEttAPErX9aQ8hJSbSQxUEgvHXzb4z10NvDwqRYU042dr8WwEgejTov4wbctfIMNIcIJVlM30mqW1iayFHrwQojy4ZCcEZCZCyXaxY1w2xfHd2j15W1gkXWI7Ba62bKuBTPu3oRzFzZB855P2VQn7l0lw0wDOqolH";
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
                'Content-Type': 'application/json'

            }
          };

          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

            let bd  = body.substr(196)

            let bdParse  = JSON.parse(bd)

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
              let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;


              //console.log('Incoming webhook: ' + JSON.stringify(req.body));
              console.log('si entro01')
              let body =     JSON.stringify(req.body)
             
              // console.log('phone_number_id',phone_number_id)
              // console.log('from',from)
              // console.log('msg_body',req.body.entry[0].changes[0].value.messages[0])

              let chat = new Chat();

              if(phone_number_id && from){

                chat.phone_number_id = phone_number_id;
                chat.from  = from;
                chat.msg_body   = msg_body;


                  chat.IdChat = from;
         
                try{

                      let chats = await Chat.find({"IdChat":req.body.entry[0].changes[0].value.messages[0].from}).exec().then((response)=>{
                                    return response;
                      });

                      if(chats){
                       

                        let datos = [{
                          Nombre: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                          messagesID: req.body.entry[0].changes[0].value.messages[0].id,
                         numero:  req.body.entry[0].changes[0].value.messages[0].from,
                         msgText:  req.body.entry[0].changes[0].value.messages[0].text.body,
                         timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
                        }]

                       chat.IdChat = from;
                        chat.Emisor = datos
                     
                       let update = await Chat.findOneAndUpdate({"IdChat":req.body.entry[0].changes[0].value.messages[0].from},{$push:{"Emisor":datos}}).exec().then((response)=>{
                        return response;
                         });

                         if(update){
                           return res.status(200).send({Mensaje:"Updated !"});

                         }


                       

                      }else{



                                  let datos = [{
                                    Nombre: req.body.entry[0].changes[0].value.contacts[0].profile.name,
                                    messagesID: req.body.entry[0].changes[0].value.messages[0].id,
                                  numero:  req.body.entry[0].changes[0].value.messages[0].from,
                                  msgText:  req.body.entry[0].changes[0].value.messages[0].text.body,
                                  timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
                                  }]

                                chat.IdChat = from;
                                chat.Emisor = datos
                              
                                
                                  let  output = await chat.save();
                                  return res.status(200).send({Mensaje:"Saved!"});
                                  
                      }



                        
                      }
                catch(e){
                    console.log(e);
                };

                   




                // chat.IdChat = from;
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
                // console.log("recptor:",recptor)
                    





                    


                              // let io = require('../index');

                              //       io.on('connection',(socket) => {
                              //       console.log('La conexion ha sido creada con el socket: ' + socket.id)

                              //       console.log('si entro02')

                              //           if(body){

                              //                           let bodyb =     JSON.stringify(req.body)


                              //             socket.emit("data",bodyb)
                              //         }
                              //       });






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


      saveLista: function( req, res){

        let params = req.body;
        

        let list = new Listado();

         list.nombreLista = params.nombreLista
         list.datos = params.datos

        list.save().then((response)=> {
          return res.status(200).send({response});
        });
            
      
      }

}


module.exports = controllers;

// Es posible que los mensajes no estén disponibles. Revisa el problema.....


// tengo que crear una temple
//agegar un usuario
//enviar mensaje a un user