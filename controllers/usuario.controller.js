

const request = require('request');

const axios = require('axios')

//   let token = "EAAEYkh4JKI0BOxvCWFQMAl8KZBxKLAYXjmEP9Y2S8X4ojURIfePm4vshXwdG9Xl3qNgIVFI9z5hAaEyTFAInQDXcgzDsxFGqojYdZBFS5Oxv5wu34nC8HdOw4b3Xg9KR1zwZBE6GtnESEDWZBlSaSVkwbZA7ihgRkzC7fJvcDmsxzJ69NnkahVfZC4ea4SZA17yERvWWeSblJwp7DVR8ufQV6Y4kthbh1bvjygZD"

 //let token = 'EAAEYkh4JKI0BO7DAVK7ohJB6jm7AgffZBWZBxQM6E6G2uZBzy33kpxrqpuOOrEQ3eYRwgzi5atLWmrLHhmPwq9DC1gSSokvgxZCHgL9eXYOZAkAi5zI16tkpNQw3YAlrP8bBvuYCBqNLZBfYBfYEfY08ZB9lE8vjdID1vqXYRBIoSkmokKZC77LpPGmsoA9G6QhwZB2L2fHAhYLzWNCsZD'


   let token ="EAAEYkh4JKI0BO5N27NOZC5JVqqLKiNDKXjeY900hhIMIZB7swxEttAPErX9aQ8hJSbSQxUEgvHXzb4z10NvDwqRYU042dr8WwEgejTov4wbctfIMNIcIJVlM30mqW1iayFHrwQojy4ZCcEZCZCyXaxY1w2xfHd2j15W1gkXWI7Ba62bKuBTPu3oRzFzZB855P2VQn7l0lw0wDOqolH";
let controllers  = {

    Home: function(req,res){

        res.status(200).send({
            Mensaje:'si todo esta bien !!'
        });
     },



     usuario: async function( req, res ){


            let user  = 'MjAyNC0wMi0wMS0x'

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

      receivPosteMessage: function( req, res){

        const io = require('../index');
        console.log('si entro')
        // console.log('io',io)

        // console.log('Incoming webhook: ' + JSON.stringify(req.body));
       // console.log('si req',req)

        io.on('connection',(socket) => {
        console.log('si entro02')
            
            if(req){
               
                             let body =     JSON.stringify(req.body)
                                  
                           console.log('req.body',body)
            
               socket.emit("data","body")
               return res.status(200).send(
                   JSON.stringify(req.body)
               )
           }
          });
            


      }


}


module.exports = controllers;

// Es posible que los mensajes no estén disponibles. Revisa el problema.....


// tengo que crear una temple
//agegar un usuario
//enviar mensaje a un user