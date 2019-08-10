'use strict';

const author = require('../db/models/author.model');
//guardar autores
module.exports.create = function (req, res) {
  let add_author = new author({
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



module.exports.list = function (req, res) {
  let search_criteria = req.query.search_criteria

  author.find({
    $or: [
      { firstname: new RegExp(search_criteria, 'i') },
      { lastname: new RegExp(search_criteria, 'i') }
    ]
  }).then(function (authors) {
    if (authors.length > 0) {
      res.json({ success: true, authors_list: authors });
    } else {
      res.json({ success: false, authors_list: authors });
    }
  }
  );
};

module.exports.findAuthor = function (req, res) {

  let authorFirstname = req.query.firstname;

  author.find({ name: authorFirstname }, { firstname: 1, lastname: 1, biography: 1, birthyear: 1 }).then(
    function (authors) {
      res.send(authors);
    } 
  );
};

module.exports.findAuthorID = function (req, res) {
  author.find({ _id: req.body.id_author }).then(
    function (author) {
      if (author) {
        res.json({ success: true, author: author  });
      } else {
        res.json({ success: false, author: author });
      }
    }
  );
};
