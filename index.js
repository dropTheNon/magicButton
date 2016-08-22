var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// JSON web token dependencies
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

var app = express();

// mongoose dependencies
var mongoose = require('mongoose');
// models and mongoose connection can go here
mongoose.connect('mongodb://localhost/magic-button');

// decode POST data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev')); 

app.listen(3000);