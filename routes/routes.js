module.exports = function(app, passport, db) {

    const graphqlHTTP = require('express-graphql')
    const schema = require('../db/schema')()

    app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true
    }))

    app.get('/', function(req, res){
        res.sendfile('./public/views/index.html')
    })


};
