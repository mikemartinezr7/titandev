'use strict';

const book_model = require('../db/models/book.model');

module.exports.create = function(req, res){
    let new_book = new book_model(
        {
            name : req.body.name,
            image : req.body.image,
            genre : req.body.genre,
            author : req.body.author,
            description : req.body.description,
            year : req.body.year,
            editorial : req.body.editorial,
            type : req.body.type,
            language : req.body.language,
            isbn : req.body.isbn,
            price : req.body.price,
            quantity : req.body.quantity   
        }
    );
    new_book.save(
        function (error){
            if(error){
                res.json({success: false, msg : 'No se pudo registrar el libro'})
                console.log(error);
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

module.exports.findBook = function(req, res){

    let bookName = req.query.name;

    book_model.find({name:bookName}, {name: 1, editorial: 1, author:1, language: 1, price:1, _id:0}).then(
        function(books){
            res.send(books);
        }
    );
};
   