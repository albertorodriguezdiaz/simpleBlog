const pool = require('../settings/db');

let admin = async (req, res) =>{
    const articulos = await pool.query(` CALL ListArticulos`);
    const numArticulos = await pool.query(` CALL CountArticulos`);
    const numMensajes = await pool.query(` CALL CountMensajes`);
    const ultArticulo = await pool.query(` CALL UltimosArticulos`);
    const listMensajes = await pool.query(` CALL ListMensajes`);

    let Articulos = articulos[0];
    let NumArticulos = numArticulos[0];
    let NumMensajes = numMensajes[0];
    let UltArticulo = ultArticulo[0];
    let ListMensajes = listMensajes[0];

    res.render('admin/admin', {Articulos, NumArticulos, NumMensajes, UltArticulo, ListMensajes});
}

let addarticulo = async (req, res) =>{
    const { title, descript } = req.body;
    let user_id = req.user.id;
    await pool.query(`CALL ProAddArticulo('${title}', '${descript}', ${user_id})`);
    // Forma tradicional de hacerlo
    // const newArticulo = {
    //     title,
    //     descript,
    //     users_id
    // }
    // await pool.query('INSERT  INTO articulos set ?', [newArticulo]);
    res.redirect('/support/dashboard');
}


// Editar articulos
let editArticulo = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    const articulo = await pool.query(`CALL EditArticulo('${id}')`);
    let Articulos = articulo[0];
    console.log(Articulos);
    res.render('admin/editArticulo', { Articulos});
}

// Editar articulo POST
let editArticulos = async (req, res) =>{
    const {id} = req.params;
    const {title, descript} = req.body;
    const newArticulo = {
        title,
        descript
    }
    await pool.query('UPDATE articulos set ? WHERE id = ?', [newArticulo, id]);
    res.redirect('/support/dashboard');
}

// Eliminar Articulo]
let deleteArticulo = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    await pool.query(`CALL DeleteArticulo('${Id}')`);
    res.redirect('/support/dashboard');
}

// Eliminar mensaje
let deleteMensaje = async(req, res) =>{
    const {id} = req.params;
    let Id = parseInt(id);
    await pool.query(`CALL DeleteMensaje('${Id}')`);
    res.redirect('/support/dashboard');
}

module.exports = {
    admin,  
    addarticulo,
    editArticulo,
    editArticulos,
    deleteArticulo,
    deleteMensaje,
}