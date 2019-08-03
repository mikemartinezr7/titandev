'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const appConfig = require('./config/config');

const app = express();
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//Database initialization
mongoose.connect('mongodb://' + appConfig.db.server + ':' + appConfig.db.port + '/' + appConfig.db.name, { useNewUrlParser: true });

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
app.use('/api/province',provinceRouter);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api', (req, res) => {
  res.send('Hello World!');
});


//Server initalization
const server = app.listen(appConfig.server.port, function () {
  console.log('Server running on port:' + appConfig.server.port);
});
