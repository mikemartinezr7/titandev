# TitanDev
Proyecto 1 para Cenfotec

## Estructura de carpetas del proyecto
```
.
|
|-api/
|  |-controllers/
|  | |-user.controller.js
|  | |-club.controller.js
|  | |-book.controller.js
|  | |-library.controller.js
|  |
|  |-db/
|  | |-models/
|  |   |-user.model.js
|  |   |-club.model.js
|  |   |-book.model.js
|  |   |-library.model.js
|  |
|  |-routes/
|      |-book.routes.js
|      |-club.routes.js
|      |-library.routes.js
|      |-user.routes.js
|
|-config/
|  |-config.json
|
|-public/
|  |-css/
|  |-js
|  |-fonts
|  |-img
|  |-index.html
|
|-app.js
|-.gitignore
|-packages.json
|-packages-lock.json
|-README.md
```

## Rutas pare el backend (API)

### Libros
`GET         /api/book         //Obtener todos los libros`
`GET         /api/book/:bookid     //Obtener un solo libro`
`POST            /api/book         //Crear un libro nuevo`
`PUT         /api/book/:bookid     //Actualiza la informacion de un libro`
`DELETE          /api/book/:bookid     //Elimina un libro`
`POST            /api/book/:bookid/exchange      //Crea una solicitud de intercambio de libro`
`PUT            /api/book/:bookid/exchange      //Actualiza la informacion del intercambio de libro (Aceptar y rechazar intercambio)`

### Clubes de lectura
`GET         /api/club         //Obtener todos los clubes`
`GET         /api/club/:genre          //Obtener todos los clubes por genero`
`GET         /api/club/:location          //Obtener todos los clubes por ubicacion`
`GET         /api/club/:clubid             //Obtener un solo club`
`POST            /api/club     //Crear un club nuevo`
`PUT         /api/club/:clubid     //Actualiza la informacion de un club`
`DELETE          /api/club/:clubid     //Elimina un club`
`GET         /api/club/:clubid/close         //Cierra un club de lectura`
`POST            /api/club/join    //Registrar un usuario como parte de un club de lectura`
`POST            /api/club/leave   //Abandona un usuario como parte de un club de lectura`
`POST            /api/club/:clubid/comment         //Publica un comentario en un club de lectura`
`GET         /api/club/:clubid/comment         //Obtiene los comentarios de un club de lectura`

### Librerias
`GET         /api/library            //Obtiene el listado de todas las librerias`
`POST        /api/library            //Crea una libreria`
`PUT         /api/library/:libraryid            //Actualiza los datos de una libreria`
`POST        /api/library/join           //Suscribirse a una sucursal`
`POST        /api/library/leave           //Darse de alta en una sucursal`
`POST        /api/library/:libraryid/branch          //Crea una sucursal de la libreria`
`PUT        /api/library/:libraryid/branch/:branchid          //Actualiza la info de sucursal de libreria`
`POST        /api/library/:libraryid/book            //Anade un libro a la sucursal`
`DELETE        /api/library/:libraryid/book/:bookid            //Elimina un libro de la sucursal`
`POST        /api/library/:libraryid/promo           //Crea una promocion`
`PUT        /api/library/:libraryid/promo/:promoid           //Edita la info de una promocion`
`DELETE      /api/library/:libraryid/promo/:promoid          //Elimina una promocion`

### Usuarios
`GET         /api/user          //Obtiene todos los usuarios`
`GET         /api/user/:userid          //Obtiene los datos de un unico usuario`
`PUT         /api/user           //Actualiza los datos de un usuario`
`POST        /api/user           //Crea un usuario nuevo`
`POST        /api/user/:userid/recover           //Recupera contrasena de un usuario`
`POST        /api/user/login           //Inicia sesion de usuario`
`POST        /api/user/logout           //Desconecta sesion de usuario`
`GET         /api/user/books         //Obtiene la lista de libros de los usuarios`
`GET         /api/user/:userid/books          //Obtiene la lista de libros de un usuario`
`PUT         /api/user/:userid/books/:bookid     //Actualiza los datos de los libros del usuario`
`POST        /api/user/:userid/rate          //Califica al usuario de intercambio`

### Compras
`POST        /api/shop           //Crea un carrito de compra`
`POST        /api/shop/:shopid/add           //Agrega un item al carro de compras`
`PUT         /api/shop/:shopid           //Actualiza la informacion del carrito de compras`
`POST        /api/shop/:shopid/confirm           //Finaliza la compra (Anade informacion de pago: info de tarjeta)`

### Administracion
