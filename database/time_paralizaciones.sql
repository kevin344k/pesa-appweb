create table time_paralizaciones(
id_time_par int not null primary key,
fecha date not null,
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