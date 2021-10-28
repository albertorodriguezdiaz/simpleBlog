const pool = require('../settings/db');

let index = async (req, res) =>{
    const articulos = await pool.query(` CALL ListArticulos`);
    const users = await pool.query(`CALL ListUser`);

    let Articulos = articulos[0];
    let Users = users[0];

    res.render('index', {Articulos, Users});
}

let AddMensaje = async (req, res) =>{
    const {nombre, correo, description} = req.body;
    await pool.query(`CALL AddMEnsaje('${nombre}', '${correo}', '${description}')`);
    res.redirect('/');
}

module.exports = {
    index,
    AddMensaje,
}