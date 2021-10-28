CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(45) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    nombre VARCHAR(45) NOT NULL, 
    apellido VARCHAR(45) NOT NULL, 
    documento INT(45) NOT NULL 
);
ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

CREATE TABLE articulos (
    id INT(11) NOT NULL,
    title VARCHAR(45) NOT NULL,
    descript TEXT,
    hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    users_id INT(11),
    CONSTRAINT fk_users_id FOREIGN KEY(users_id) REFERENCES users(id)
);
ALTER TABLE articulos
    ADD PRIMARY KEY (id);
ALTER TABLE articulos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



DROP PROCEDURE IF EXISTS ProAddArticulo;

-- Mensajes
CREATE TABLE mensaje (
  id INT(11) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  description TEXT
);

ALTER TABLE mensaje
  ADD PRIMARY KEY (id);

ALTER TABLE mensaje
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


-- AddArticulo
DELIMITER $$
CREATE PROCEDURE ProAddArticulo(
    in Title VARCHAR(45),
    in Descript TEXT,
    in Users_id INT(11)
)
BEGIN
    insert into articulos(title, descript, users_id) values (Title, Descript, Users_id);
END
$$

--ListarArticulo
DELIMITER $$
CREATE PROCEDURE ListArticulos()
BEGIN
    select * from articulos;
END
$$

--contarArticulo
DELIMITER $$
CREATE PROCEDURE CountArticulos()
BEGIN
    select COUNT(id) AS total from articulos;
END
$$

--contar Mensajes
DELIMITER $$
CREATE PROCEDURE CountMensajes()
BEGIN
    select COUNT(id) AS total from mensaje;
END
$$

--Listar ultimos articulos
DELIMITER $$
CREATE PROCEDURE UltimosArticulos()
BEGIN
    SELECT * FROM articulos ORDER BY id DESC LIMIT 6;
END
$$

--Listar mensajes
DELIMITER $$
CREATE PROCEDURE ListMensajes()
BEGIN
    SELECT * FROM mensaje ORDER BY id DESC LIMIT 12;
END
$$

--Editar Articulos
DELIMITER $$
CREATE PROCEDURE EditArticulo(
    in num VARCHAR(20)
)
BEGIN
    SELECT * FROM articulos WHERE id = num;
END
$$

--  Eliminar procedimimentos
-- DROP PROCEDURE IF EXISTS CountMensajes;