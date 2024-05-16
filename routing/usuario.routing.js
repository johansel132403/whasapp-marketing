
var express = require('express');

var routing = express.Router();
const request = require('request');

var controller = require('../controllers/usuario.controller');

// esto es para la autorizacion
// var middlewer = require('../Middlewer/authentication');

//archivos de imagen

// var multiparty = require('connect-multiparty');
// var _multiparty = multiparty({uploadDir:'./upload'});



    routing.get('/home',controller.Home);
    routing.get('/get',controller.usuario);
    routing.post('/createtemplate',controller.crateTemplate);
    routing.get('/webhook',controller.receiveMessage);
    routing.post('/webhook',controller.receivPosteMessage);
    routing.post('/saveList',controller.saveLista);
    routing.post('/sendandsavedmsg',controller.sendAndSavedMessage);
    
    




module.exports = routing;