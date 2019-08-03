'use strict';

const libraryModel = require("../db/models/library.model");

const controller = {
  list: function (req, res) {
      console.log(`GET from library Controller`);
      
      return res.send('get from library controller'); 
  },

  create: function(req, res) {
    let newLibrary =  new libraryModel({
      commercialName: req.body.commercialName,
      brandName: req.body.brandName,
      address: req.body.address,
      location: req.body.location
    });
  }
}

module.exports = controller;