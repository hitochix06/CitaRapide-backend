require('dotenv').config()
require('./models/connection');
const citationsRouter = require('./models/citations');
const citationRouter = require('./routes/citation');


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ajout des routes
app.use('/', indexRouter);
app.use('/citations', citationsRouter);
app.use('/citation', citationRouter);





module.exports = app;