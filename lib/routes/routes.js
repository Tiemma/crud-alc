'use strict';

module.exports = function (app, passport, db) {

    var graphqlHTTP = require('express-graphql');
    var schema = require('../db/schema')();

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    app.get('/', function (req, res) {
        res.sendfile('./public/views/index.html');
    });
};