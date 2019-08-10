'use strict';

const genreModel = require('../db/models/genre.model');

module.exports.create = function(req,res){
    let newGenre = new genreModel({
        name : req.body.name
    });

    newGenre.save(function(error){
        if(error){
            res.json({
                success: false,
                msj : 'El género no pudo ser registrado. ' + error
            })
        }else{
            res.json({
                success: true,
                msj : 'El género fue registrado de forma exitosa.'
            });
        }
    });
};



module.exports.list = function (req, res) {
    let search_criteria = req.query.search_criteria
  
    genreModel.find({
      $or: [
        { name: new RegExp(search_criteria, 'i') },
      ]
    }).then(function (genres) {
      if (genres.length > 0) {
        res.json({ success: true, genres_list: genres });
      } else {
        res.json({ success: false, genres_list: genres });
      }
    }
    );
  };
  
  module.exports.findGenre = function (req, res) {
  
    let genreName = req.query.name;
  
    genre.find({ name: name }, { name: 1}).then(
      function (genres) {
        res.send(genres);
      } 
    );
  };
  
  module.exports.findGenreID = function (req, res) {
    genre.find({ _id: req.body.id_genre }).then(
      function (genre) {
        if (genre) {
          res.json({ success: true, genre: genre  });
        } else {
          res.json({ success: false, genre: genre });
        }
      }
    );
  };