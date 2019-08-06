'use strict';

const Author = require('../db/models/author.model');
//guardar autores
module.exports.create = function (req, res) {
  let add_author = new Author({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthyear: req.body.birthyear,
    biography: req.body.biography
  });

  add_author.save(function (error) {
    if (error) {
      res.json({ success: false, msg: 'Autor o informacion incompleta' });
    }
    else {
      res.json({ success: true, msg: 'autor registrado correctamente' });
    }
  }
  );
};

//ver autores
module.exports.list = function (req, res) {
  let param = req.query.firstname;

  Author.find({ firstname : param }, 'firstname lastname', function (error, authors) {
    if (error) {
      res.json({ success: false, message: error, mensaje: "Ha ocurrido un errorr"  });  
    }

    res.json(authors);
  });
};
