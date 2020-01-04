//==== Set Up

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var cors = require('cors');

//==== set up Local

var config = require('./App/config');
var User = require('./App/Models/user');
var port = 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(config.database);
app.set('secretKey', config.secret);
app.use(cors());

app.listen(4000);