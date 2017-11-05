const express = require('express')
const graphqlHTTP = require('express-graphql')

import db from "./db"
import schema from "./schema"
import path from "path"

const app = express()

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + "/../views/index.html"))
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.use('/students', graphqlHTTP({
schema: schema,
graphiql: true
}))

app.listen(4000)

console.log("Server started ")

