'use strict';

const {comprasModel} = require('../db/models/compra.model');

module.exports.create = function (req, res) {
  let nueva_compra = new comprasModel(
    {
      books: req.body.books,
      date: req.body.date,
      subtotal: req.body.subtotal,
    }
  );
  nueva_compra.save(
    function (error) {
      if (error) {
        res.json({ success: false, msg: 'No se pudo registrar la compra' })
        console.log(error);
      } else {
        res.json({ success: true, msg: 'La compra se registró exitosamente' });
      }
    }
  );
};

module.exports.list = function (req, res) {
  let search_criteria = req.query.search_criteria

  compra_model.find({
    $or: [
      { name: new RegExp(search_criteria, 'i') },
      { genre: new RegExp(search_criteria, 'i') },
      { author: new RegExp(search_criteria, 'i') },
      { editorial: new RegExp(search_criteria, 'i') },
      { type: new RegExp(search_criteria, 'i') },
      { date: new RegExp(search_criteria, 'i')},

    ]
  }).then(function (compra) {
    if (compra.length > 0) {
      res.json({ success: true, compra_list: compra });
    } else {
      res.json({ success: false, compra_list: compra });
    }
  }
  );
};
