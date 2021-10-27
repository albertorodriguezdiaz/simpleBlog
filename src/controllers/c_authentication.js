const pool = require('../settings/db');

let signup = (req,res) =>{
    res.render('auth/signup');
}

let signin = (req,res) =>{
    res.render('auth/signin');
}

module.exports = {
    signup,
    signin
}