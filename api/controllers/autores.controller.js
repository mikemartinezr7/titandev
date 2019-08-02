'use strict';

const new_author = required('../db/models/authors.model');
//guardar autores
module.exports.create = function(req, res)
{
 let add_author = new new_author
 (
     {
         nombre: req.body.nombre,
         apellido: req.body.apelliddo,
         nacimiento: req.body.nacimiento,
         biografia: req.body.biografia
    }
) ;
    add_author.save
    (
        function (error) 
        {
            if (error ){
                res.json({success : false, msg : 'Autor o informacion incompleta'});
            }
            else { 
                res.json({success : true, msg : 'autor registrado correctamente'});
            }
        }
    );
};
//ver autores
module.exports.list = function(req,res)
{
    new_author.find().then
    (
        function(regAuthors)
        {
            if(regAuthors.length >0)
            {
                res.json({success: true, authors_list : regAuthors});            
            }
            else 
            {
                res.json({success :false, authors_list : regAuthors});
            }
        
        }
    );

};
