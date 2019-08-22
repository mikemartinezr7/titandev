'use strict';

const categoryModel = require('../db/models/category.model');

module.exports.create = function(req,res){
    let newCategory = new categoryModel({
        nameCat : req.body.nameCat
    });

    newCategory.save(function(error){
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
  
    genreCategory.find({
      $or: [
        { nameCat: new RegExp(search_criteria, 'i') },
      ]
    }).then(function (categories) {
      if (category.length > 0) {
        res.json({ success: true, category_list: category });
      } else {
        res.json({ success: false, category_list: category });
      }
    }
    );
  };
  
  module.exports.findCategory = function (req, res) {
  
    let categoryName = req.query.name;
  
    category.find({ nameCat: nameCat }, { nameCat: 1}).then(
      function (category) {
        res.send(category);
      } 
    );
  };
  
  module.exports.findCategoryID = function (req, res) {
    category.find({ _id: req.body.id_genre }).then(
      function (category) {
        if (category) {
          res.json({ success: true, genre: genre  });
        } else {
          res.json({ success: false, genre: genre });
        }
      }
    );
  };