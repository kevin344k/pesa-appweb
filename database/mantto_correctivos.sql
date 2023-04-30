create table mantto_correctivos(
cc_linea smallint not null,
danio_desc varchar(200) not null,
type_danio enum  ('Eléctrico','Mecánico') not null
)

