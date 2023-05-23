/*create table infor_op(
num_infor int not null auto_increment primary key,


#personal en máquina
name_op varchar(50) not null, 
person_name_ay varchar(50) not null,
person2_name_ay varchar(50) ,
person3_name_ay varchar(50) ,
person4_name_ay varchar(50) ,


#produccion de la máquina
und_ok smallint not null,
scrap smallint not null,



#codigos de paralizacion
 cod_stop_1 smallint,
 time1_start time,
 time1_end time,
 cod_stop_2 smallint,
  time2_start time,
 time2_end time,
 cod_stop_3  smallint,
  time3_start time,
 time3_end time,
 cod_stop_4 smallint,
  time4_start time,
 time4_end time,
 cod_stop_5 smallint,
  time5_start time,
 time5_end time
 


);

*/
alter table infor_op 
drop column cod_stop_1 ,
 drop column time1_start ,
 drop column time1_end ,
 drop column cod_stop_2 ,
  drop column time2_start ,
 drop column time2_end ,
drop column cod_stop_3  ,
 drop column time3_start ,
 drop column time3_end ,
drop column cod_stop_4 ,
 drop column time4_start ,
 drop column time4_end ,
drop column cod_stop_5 ,
drop column time5_start ,
drop column time5_end ;
 