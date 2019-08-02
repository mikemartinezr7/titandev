'use strict';

const libraryModel = require("../db/models/library.model");

const controller = {
  list: function (req, res) {
      console.log(`GET from library Controller`);
      
      return res.send('get from library controller'); 
  },

  create: function(req, res) {
    
  }
}

module.exports = controller;