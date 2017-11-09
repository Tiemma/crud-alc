'use strict';

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var graphqlHTTP = require('express-graphql');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var PORT = process.env.PORT || 3000;

var db = require('./db')();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/../public'));
app.set("views", "./view");
app.set('view engine', 'ejs'); // set up ejs for templating

app.get('/', function (req, res) {
        return res.sendfile('./view/index.html');
});

app.get('/students', function (req, res) {
        db.student.find({}, function (err, students) {
                res.setHeader('Content-Type', 'application/json');
                return res.send(JSON.stringify(students));
        });
});

app.get('/departments', function (req, res) {
        db.department.find({}, function (err, department) {
                res.setHeader('Content-Type', 'application/json');
                return res.send(JSON.stringify(department));
        });
});

app.use('/graphql', graphqlHTTP({
        schema: _schema2.default,
        graphiql: true
}));

app.listen(PORT);

console.log("Server started on PORT" + PORT);