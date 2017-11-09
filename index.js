const express	 = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose 	 = require('mongoose');
const passport 	 = require('passport');
const flash   	 = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const app 	   = express()
const PORT = process.env.PORT || 3000

import schema from "./schema"
import path from "path"

const db = require('./db')()

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/../public'));
app.set("views",  "./view")
app.set('view engine', 'ejs'); // set up ejs for templating

app.get('/', function(req, res){
      return res.sendfile('./public/view/index.html')

});

app.get('/students', function(req, res){
	db.student.find({}, function(err, students){
	        res.setHeader('Content-Type', 'application/json');
                return res.send(JSON.stringify(students))
        })
})

app.get('/departments', function(req, res){
        db.department.find({}, function(err, department){
                res.setHeader('Content-Type', 'application/json');
                return res.send(JSON.stringify(department))
        })
})


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(PORT)

console.log("Server started on PORT" + PORT)

