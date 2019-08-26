const express = require('express'),
    router = express.Router(),
    Producto = require('../models/producto.model');

//Para las rutas get con id mediante url.
router.param('id', function(req, res, next, id) {
    req.body.id = id;
    next();
});

//Definición y funcionalidad del endpoint.
router.get('/obtener-productos', function(req, res) {
    Producto.find()
        .exec((err, productosBD) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                    msg: 'No se pudieron listar los productos.'
                });
            } else {
                res.json({
                    ok: true,
                    contactos: productosBD
                });
            }
        })
});

router.post('/registrar-producto', function(req, res) {
    let body = req.body;

    let nuevo_producto = new Producto({
        nombre: body.nombre,
        precio: body.precio
    });
    nuevo_producto.save(
        function(err, productoBD) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se pudo registrar el producto.',
                    err
                });
            } else {
                res.json({
                    ok: true,
                    productoBD: productoBD
                });
            }
        }
    );
});



// Se exporta el modulo
module.exports = router;