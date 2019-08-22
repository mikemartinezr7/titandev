'use strict';

const category = require('../db/models/category.model');

module.exports.create = function(req,res){
  let add_category = new category({
      categoryname : req.body.categoryname,
      details : req.body.details
    });

    add_category.save(function(error){
        if(error){
            res.json({success: false, msj : 'La Categoria no se ha registrado'});
        }
        else{
            res.json({
                success: true, msj : 'Categoria agregada'});
          }
        }
    );
};



module.exports.list = function (req, res) {
    let search_criteria = req.query.search_criteria
  
    category.find({
      $or: [
        { categoryname: new RegExp(search_criteria, 'i') },
      ]
    }).then(function (categories) {
      if (categories.length > 0) {
        res.json({ success: true, categories_list: categories });
      } else {
        res.json({ success: false, categories_list: categories });
      }
    }
    );
  };
  
  module.exports.findCategory = function (req, res) {
  
    let categoryCategoryname = req.query.categoryname;
  
    category.find({ categoryname: categoryCategoryname}, { categoryname: 1}).then(
      function (categories) {
        res.send(categories);
      } 
    );
  };
  
  module.exports.findCategoryID = function (req, res) {
    category.find({ _id: req.body.id_category}).then(
      function (category) {
        if (category) {
          res.json({ success: true, category: category  });
        } else {
          res.json({ success: false, category: category });
        }
      }
    );
  };