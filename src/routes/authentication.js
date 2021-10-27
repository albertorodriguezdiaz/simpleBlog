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


module.exports = app;