'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session  = require('express-session');
const appConfig = require('./config/config');

const app = express();
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Length, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(session({
  secret: 'VGhpcyBpcyBhIFRpdGFuZGV2IEFwcA==',
  resave: true,
  saveUninitialized: true
}));


//Authentication and Authorization
const auth =  function(req, res, next) {
  if (req.session && req.session.user) {
    const admin = ['library', 'book', 'club', 'user', 'genre', 'author', 'category'];
    const library = ['library', 'book', 'club', 'genre', 'author', 'category'];
    const client = ['library', 'book', 'club', 'genre', 'author', 'category'];

    let module =  req.baseUrl.replace('/api/', '', 'gi');

    /*switch(module) {
      case '': break;

      default: break;
    }*/
    
    return next();
  } else {
    return res.status(401).send();
  }
}


//Define the main path of the app
global.appRoot = path.resolve(__dirname);


//Connect to the database
const connector = mongoose.connect(appConfig.db.connectionString, { useNewUrlParser: true, useFindAndModify: false });

db.on('error', function (err) {
  console.log('Error en la BD: ' + err);
});

db.on('open', function (err) {
  console.log('Database connection ok');
});


//Routes definition
const libraryRouter = require('./api/routes/library.routes');
app.use('/api/library', libraryRouter);

const bookRouter = require('./api/routes/book.routes');
app.use('/api/book', bookRouter);

const clubRouter = require('./api/routes/club.routes');
app.use('/api/club', clubRouter);

const userRouter = require('./api/routes/user.routes');
app.use('/api/user', userRouter);

const provinceRouter = require('./api/routes/province.routes');
app.use('/api/province', provinceRouter);

const genreRouter = require('./api/routes/genre.routes');
app.use('/api/genre', genreRouter);

const authorRouter = require('./api/routes/author.routes');
app.use('/api/author', authorRouter);

const categoryRouter = require ('./api/routes/category.routes');
app.use('/api/category', categoryRouter);

const productoRouter = require('./api/routes/producto.routes');
app.use('/api/producto', productoRouter);

const carritoRouter = require('./api/routes/carrito.routes');
app.use('/api/carrito', carritoRouter);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api', (req, res) => {
  res.send('Welcome to the API');
});

//Server initialization
const server = app.listen(appConfig.server.port, function () {
  console.log('Server running on port:' + appConfig.server.port);
});
