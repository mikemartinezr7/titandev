'use strict';

const book_model = require('../db/models/book.model');

module.exports.create = function(req, res){
    let new_book = new book_model(
        {
            name : req.body.name,
            genre : req.body.genre,
            price : req.body.price,
            author : req.body.author,
            isbn : req.body.isbn,
            description : req.body.description,
            image : req.body.image,
            quantity : req.body.quantity,
            editorial : req.body.editorial,
            year : req.body.year,
            language : req.body.language,
            type : req.body.type
        }
    );
    new_book.save(
        function (error){
            if(error){
                res.json({success: false, msg : 'No se pudo registrar el libro'});
            }else{
                res.json({success: true, msg: 'El libro se registró exitosamente'});
            }
        }
    ); 
};

module.exports.list = function(req, res){
    book_model.find().then(
        function(books){
            if(books.length > 0){
                res.json({success: true, books_list : books});
            }else{
                res.json({success: false, books_list : books});
            }
        }
    );
};