'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connection;
const appConfig = require('../../../config/config.json');
const provincesData = require('./data/provinces');

console.log('INICIO');

//Database initialization
mongoose.connect('mongodb+srv://cenfotec:cenfotec@cluster0-nda0t.azure.mongodb.net/library?retryWrites=true&w=majority', { useNewUrlParser: true });

db.on('error', function (err) {
  console.log('[ ERROR ] Conexion con la BD (' + err + ')');
  process.exit();
});

db.on('open', function (err) {
  console.log('[ OK ] Conexion con la BD');
});


//Get data for provinces, counties and districts
const {ProvinceModel} = require("../models/province.model");
const newProvinces = new ProvinceModel(provincesData);

ProvinceModel.collection.insertMany([newProvinces], { upsert: true }, function(error, data) {
  if (error) {
      console.log('[ ERROR ] Insertar datos de provincias (' + error + ')');
      process.exit();
  } 
  
  console.log('[ OK ] Insertar datos de provincias');
  
  db.close(function(){
    console.log('FIN');
    process.exit();
  });
});

//Server initalization
const server = app.listen(appConfig.server.port, function () {
  console.log('[ OK ] Servidor corriendo en puerto ' + appConfig.server.port);
});