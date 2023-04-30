##paralizaciones
use  proy_tesis3;
create table paralizaciones(
tipo_paro varchar(50) not null,
cod_paro int not null,
desc_paro varchar(200) not null
);


show columns from tb_planeacion;

alter table paralizaciones add primary key(cod_paro);

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Tiempos perdidos por defectos parciales','900','Tiempos perdidos mecánicos no definidos');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Tiempos perdidos por defectos parciales','901','Tiempos perdidos Eléctricos no definidos');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Tiempos perdidos por defectos parciales','902','Tiempos perdidos Moldes no definido');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1001','caja reductora');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1002','Bomba hidraulica/agua');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1003','Falla de prensa molde');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1004','Rotura de manguera');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1005','Rotura de cañeria');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1006','Daño cilindro o válvula hidraulico');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1007','Daño cilindro o válvula neumático');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1008','Cambio de retenedores');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1009','Estiradores');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1009','Estiradores');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1011','Fuga de aceite');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1012','Falla bomba de vacío');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1015','Daño de molino');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1017','Daño de Equipo periferico(Chiller,calentadores');

insert into paralizaciones (tipo_paro,cod_paro,desc_paro) 
values ('Daño mecanico','1018','Daño de cuchillas de corte');

