#use proy_tesis
#select * from lineas
#show columns from lineas 
#### tabla para planeacion
create table planeacion(
id_plan int auto_increment,
cod_item_plan varchar(10) not null,
nombre_item_plan varchar(100) NOT NULL,
linea_plan_cc int(3) not null, #centro de costo de l  linea a usar en el plan
cant_plan int(10) not null,
units_cant_plan varchar(4) not null,
date_start date not null,
time_start Time not null,
date_end date not null,
time_end Time not null,
primary key (id_plan)
###falta una columna que indique que la linea esta en mantenimiento
);

###drop table planeacion

