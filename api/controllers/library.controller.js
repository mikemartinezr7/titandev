'use strict';

const controller = {
  list: (req, res) => {
      console.log(`GET from library Controller`);
      
      return res.send('get from library controller'); 
  },

  create: (req, res) => {
      console.log('POST from libraryController');

      return res.send('POST from Library Controller');
  }
}

module.exports = controller;