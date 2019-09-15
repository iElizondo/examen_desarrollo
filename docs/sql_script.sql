/*
Created: 11/09/2019
Modified: 11/09/2019
Model: MySQL 5.7
Database: MySQL 5.7
*/


-- Create tables section -------------------------------------------------

-- Table usuarios

CREATE TABLE usuarios
(
  id Int NOT NULL AUTO_INCREMENT,
  correo Varchar(150) NOT NULL,
  contrasena Varchar(150) NOT NULL,
  nombre Varchar(150) NOT NULL,
  imagen Varchar(150) NOT NULL,
  PRIMARY KEY (id)
)
;

-- Table wittes

CREATE TABLE wittes
(
  id Int NOT NULL AUTO_INCREMENT,
  usuario Int NOT NULL,
  texto Varchar(256) NOT NULL,
  fecha Date NOT NULL,
  PRIMARY KEY (id)
)
;

-- Table comentarios

CREATE TABLE comentarios
(
  id Int NOT NULL AUTO_INCREMENT,
  usuario Int NOT NULL,
  witte Int NOT NULL,
  texto Varchar(256) NOT NULL,
  fecha Date NOT NULL,
  PRIMARY KEY (id)
)
;

-- Create foreign keys (relationships) section ------------------------------------------------- 


ALTER TABLE wittes ADD CONSTRAINT FK_USU_WIT FOREIGN KEY (usuario) REFERENCES usuarios (id) ON DELETE RESTRICT ON UPDATE RESTRICT
;


ALTER TABLE comentarios ADD CONSTRAINT FK_USU_COM FOREIGN KEY (usuario) REFERENCES usuarios (id) ON DELETE RESTRICT ON UPDATE RESTRICT
;


ALTER TABLE comentarios ADD CONSTRAINT FK_WIT_COM FOREIGN KEY (witte) REFERENCES wittes (id) ON DELETE RESTRICT ON UPDATE RESTRICT
;


