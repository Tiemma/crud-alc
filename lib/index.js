'use strict';

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var graphqlHTTP = require('express-graphql');

var app = express();

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname + "/../views/index.html"));
});

app.use('/graphql', graphqlHTTP({
  schema: _schema2.default,
  graphiql: true
}));

app.use('/students', graphqlHTTP({
  schema: _schema2.default,
  graphiql: true
}));

app.listen(4000);

console.log("Server started ");