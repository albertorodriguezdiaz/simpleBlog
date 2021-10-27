const express = require('express');
const passport = require('passport');
const auth = require('../controllers/c_authentication');
const app = express.Router();

app.get('/signup', auth.signup);

app.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/support/dashboard',
    failureRedirect: '/req/signup',
    failureFlash: true
}));


app.get('/signin', auth.signin);

app.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/support/dashboard',
        failureRedirect: '/error',
        failureFlash: true
    })(req, res, next);
});


app.get('/logout', async (req, res) =>{
    req.logOut();
    res.redirect('/');
})

module.exports = app;