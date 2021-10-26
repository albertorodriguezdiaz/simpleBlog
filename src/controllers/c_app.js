const pool = require('../settings/db');

let index = (req, res) =>{
    res.render('index');
}

module.exports = {
    index,
}