'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appConfig = require('./config/config');

const app = express();
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

app.get('/api', (req, res) => {
  res.send('Hello World!');
});


//Server initalization
const server = app.listen(appConfig.server.port, function () {
  console.log('Server running on port:' + appConfig.server.port);
});
