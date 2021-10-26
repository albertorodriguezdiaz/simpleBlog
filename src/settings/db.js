const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.log('La conexion a la base de datos fue cerrada');
        }
    
        if(err.code == 'ECONNREFUSED'){
            console.log('La conexion a la base de datos fue rechazada');
        }
    }
        
    if(conn) conn.release();
    console.log('DB is connect on Clever Cloud');
    return;


    
});

pool.query = promisify(pool.query);

module.exports = pool;