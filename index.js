

var app = require('./app');

var port = 3700;
//ESTO ES PARA CONECTARNOS A MONGOOSE POR MEDIO DE LAS PROMESAS
// mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify',false);

app.listen(port,()=>{
    console.log(port)
    console.log('El puerto de 3700, ya esta listo..');
})










// mongoose.connect('mongodb://localhost:27017/Social-Network', { useNewUrlParser: true ,  useUnifiedTopology: true })
//         .then(()=>{
//             console.log('connect al puerto de mongodb..');
//         }).catch((e)=>{
//             console.log(e);
//         });