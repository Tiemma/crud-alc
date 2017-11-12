const express	 = require('express')
const mongoose 	 = require('mongoose');
const passport 	 = require('passport');
const flash   	 = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const app 	   = express()
const PORT = process.env.PORT || 3000
const db = require('./db/db')()

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
app.set("views",  "./public/views")

require('./routes/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

app.listen(PORT)

console.log("Server started on PORT" + PORT)

