'use strict';

const nuevo_autor = required('../db/models/autores.model');
//guardar autores
module.exports.create = function(req, res)
{
 let add_autor = new nuevo_autor
 (
     {
         nombre: req.body.nombre,
         apellido: req.body.apelliddo,
         nacimiento: req.body.nacimiento,
         biografia: req.body.biografia
    }
) ;
    add_autor.save
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
    nuevo_autor.find().then
    (
        function(autoresregistrados)
        {
            if(autoresregistrados.length >0)
            {
                res.json({success: true, autores_lista : autoresregistrados});            
            }
            else 
            {
                res.json({success :false, sutores_lista : autoresregistrados});
            }
        
        }
    );

};
