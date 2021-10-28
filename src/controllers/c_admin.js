const pool = require('../settings/db');

let admin = async (req, res) =>{
    const articulos = await pool.query(` CALL ListArticulos`);
    const numArticulos = await pool.query(` CALL CountArticulos`);
    const numMensajes = await pool.query(` CALL CountMensajes`);

    let Articulos = articulos[0];
    let NumArticulos = numArticulos[0];
    let NumMensajes = numMensajes[0];

    res.render('admin/admin', {Articulos, NumArticulos, NumMensajes});
}

let addarticulo = async (req, res) =>{
    const { title, descript } = req.body;
    let user_id = req.user.id;
    await pool.query(`CALL ProAddArticulo('${title}', '${descript}', ${user_id})`);
    // const newArticulo = {
    //     title,
    //     descript,
    //     users_id
    // }
    // await pool.query('INSERT  INTO articulos set ?', [newArticulo]);
    res.redirect('/support/dashboard');
}


module.exports = {
    admin,  
    addarticulo,
}