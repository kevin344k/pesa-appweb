create table mantto_prev(
id_prev int auto_increment not null primary key,
cc_linea smallint not null,
date_start datetime not null,
date_end datetime not null,
hallazgos1 varchar (255) ,
hallazgos2 varchar (255) ,
hallazgos3 varchar (255) ,
accion1 varchar (255) ,
accion2 varchar (255) ,
accion3 varchar (255) 
)