create table orden_prod(
id_plan smallint not null,
num_orden smallint auto_increment primary key,
fecha_orden date not null,
##materia prima
cod_mat_prima smallint not null,
mat_prima_desc varchar (100) not null,
cant_mat_prima_kg smallint not null,
# suministro
cod_suministro smallint not null,
suministro_desc varchar (100) not null,
cant_suministro_und smallint not null

) ;

#drop table orden_prod

#alter table orden_prod
#add persons_amount smallint

/*alter table orden_prod
add cod_molde smallint
*/
alter table orden_prod
add meta smallint