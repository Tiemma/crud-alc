'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var PORT = process.env.PORT || 3000;
var db = require('./db/db')();

require('./auth/passport')(passport, mongoose); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({
    secret: 'E34jdkfka@jk3434453kl', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session;
app.use(express.static(__dirname + '/../public'));
app.set("views", "./public/views");

require('./routes/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

app.listen(PORT);

console.log("Server started on PORT" + PORT);