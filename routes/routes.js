module.exports = function(app, passport, db) {

    const graphqlHTTP = require('express-graphql')
    const schema = require('../db/schema')()

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

       
    app.get('/students', async function(req, res){
        var student = new db.Students; 
        res.send(
        await student.find()    )
    })
        // db.student.find({}, function(err, students){
        //         res.setHeader('Content-Type', 'application/json');
        //             return res.send(JSON.stringify(students))
        // })

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
    

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    app.get('/create', function(req, res){
        res.sendfile('./public/views/index.html')
    })


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}