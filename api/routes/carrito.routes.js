const express = require('express'),
    router = express.Router(),
    Carrito = require('../models/carrito.model'),
    mongoose = require('mongoose');

//Para las rutas get con id mediante url.
router.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

//Definición y funcionalidad del endpoint.
router.get('/obtener-carrito/:id', function(req, res) {

    let body = req.body;


    Carrito.find({ _id: body.id }).populate('productos').exec((err, carrito) => {
        if (err) res.json(err)
        if (!carrito) res.json(401)
        res.json(carrito)

    });

});
router.get('/obtener-todos-carritos', function(req, res) {



    Carrito.find().populate('productos').exec((err, carrito) => {
        if (err) res.json(err)
        if (!carrito) res.json(401)
        res.json(carrito)

    });




});

router.post('/registrar-carrito', function(req, res) {
    let body = req.body;

    let nuevo_carrito = new Carrito({
        fecha: body.fecha,
        subtotal: body.subtotal
    });
    nuevo_carrito.save(
        function(err, carritoBD) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                    msg: 'No se pudo registrar el carrito.'
                });
            } else {
                res.json({
                    ok: true,
                    patrocinador: carritoBD
                });
            }
        }
    );
});


router.post('/agregar-producto', function(req, res) {
    let body = req.body;
    Carrito.updateOne({ _id: req.body._id }, {
            $push: {
                'productos': {
                    _id: mongoose.Types.ObjectId(body.id_producto),

                }

            }
        },
        function(error) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    msj: 'No se pudo agregar el producto',
                    error
                });
            } else {
                return res.json({
                    success: true,
                    msj: 'Se agregó correctamente el producto'
                });
            }
        }
    )
});

// function getUserWithPosts(id_carrito){
//     return User.findOne({ username: username })
//       .populate('posts').exec((err, posts) => {
//         console.log("Populated User " + posts);
//       })
//    }

// Se exporta el modulo
module.exports = router;