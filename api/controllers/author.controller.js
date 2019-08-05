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

  console.log(req.body);

  /*add_author.save(function (error) {
    if (error) {
      res.json({ success: false, msg: 'Autor o informacion incompleta' });
    }
    else {
      res.json({ success: true, msg: 'autor registrado correctamente' });
    }
  }
  );*/

  res.end();
};

//ver autores
module.exports.list = function (req, res) {
  /*new_author.find().then
    (
      function (regAuthors) {
        if (regAuthors.length > 0) {
          res.json({ success: true, authors_list: regAuthors });
        }
        else {
          res.json({ success: false, authors_list: regAuthors });
        }

      }
    );*/
    
};
