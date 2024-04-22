let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let userSchema = Schema({

    phone_number_id:String,
    from:String,
    msg_body:String,
     
})

module.exports = mongoose.model('chat',userSchema);