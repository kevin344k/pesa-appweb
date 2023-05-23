#CREATE DATABASE proy_tesis
 use proy_tesis;
 #
 #
 ######### tabla q almacena los codigos disponibles para usar 
 
 CREATE TABLE items(
 
 cod_item VARCHAR(10) NOT NULL,# es el codigo del producto solicitado por el cliente
 nombre_item varchar(100) NOT NULL,# nombre del producto 
  primary KEY (cod_item)
 ) ;
 #
 #
 ###### tabla que almacena las línes disponibles a usar
  CREATE TABLE lineas(
 
 cc_linea int(3) NOT NULL, # es el codigo o centro de costo (cc) de la línea
 nombre_linea varchar(100) NOT NULL,# nombre de la máquina/línea 
 estado_linea ENUM('Disponible','Mantenimiento Preventivo') NOT NULL,
 primary KEY (cc_linea)

 ) ;
 
  ####### tabla que almacena las línes disponibles a usar
  
