const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./helpers');
const pool = require('../settings/db');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const {nombre, apellido, Documento} = req.body;
    let documento = parseInt(Documento);
    let newUser = {
        username,
        password, 
        nombre,
        apellido,
        documento
    };
    console.log(password);
    newUser.password = await helpers.encryptPassword(password);
    console.log(password);

    const result = await pool.query('INSERT INTO users SET ?', newUser);
    newUser.id =  result.insertId;
    return done(null, newUser);
}));


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const resp = await pool.query('SELECT * FROM users WHERE id =?', [id]);
    done(null, resp[0]);
});