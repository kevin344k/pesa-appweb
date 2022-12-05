const express = require("express"); //se importa express para iniciar el server
const path = require("path"); // permite manejar rutas internas de archivos
const exphbs = require("express-handlebars"); //permite renderizar hbs
const morgan = require("morgan"); //crea logs de las peticiones del cliente al servidor
//BASE DE DATOS
const pool = require("./db");
//INICIALIZACIONES
const app = express(); //se inicializa express

//SETTINGS

app.set("port", process.env.PORT || 5000);
///// se configuar las carpetas con los "hbs" para ser cargado cada ves que se haga una peticion del cliente/////
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

///MIDDLEWARES

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //para que la alpicaión acepte desde los formularios que me envien los usuarios y false para no aceptar imágenes
app.use(express.json()); //para que la aplicación acepte datos en formato json
//GLOBAL VARIABLES
//toma info del cliente, lo que responde el server y continua con el codigo con next
app.use((req, res, next) => {
  next();
});

//ROUTES

app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/app", require("./routes/app"));
//FILES PUBLIC
app.use(express.static(path.join(__dirname, "public")));

//pasando el server a http
const http = require("http");
const httpServer = http.createServer(app);
//STARTING THE SERVER con express

httpServer.listen(app.get("port"));
console.log("server on port", app.get("port"));
//websockets

const { Server } = require("socket.io");
const { Socket } = require("dgram");

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("nueva conexión");
  //para buscar el codigo de producto en planner
  socket.on("cliente:plannerId", async () => {
    const [plannerId] = await pool.query(
      " SELECT COUNT(id_plan) as id FROM planner"
    );
    console.log(plannerId[0]);
    socket.emit("server:plannerId", plannerId[0]);
  });

  socket.on("planner:codigoProd", async (data) => {
    const cod = data.codigo;

    const [result] = await pool.query(
      "select * from productos where code_prod=?",
      cod
    );

    socket.emit("server:planner", result);
    console.log(result[0]);
  });

  socket.on("planner:codigoProdAll", async (data) => {
    const [result] = await pool.query("select * from productos ");

    socket.emit("server:planner", result);
  });

  socket.on("client:descProd", async (data) => {
    console.log(data);
    const [descProd] = await pool.query(
      "select desc_prod from productos where code_prod=?",
      data
    );

    socket.emit("descP", descProd[0], data);
  });

  socket.on("client:plannerSave", async (data) => {
    console.log(data);

    const poolPlan = await pool.query(
      "insert into planner (cod_prod_plan,desc_prod_plan,linea_name,linea_cc,cant_plan,units_cant_plan,date_start,date_end) values (?,?,?,?,?,?,?,?) ",
      [
        data.cod_prod_plan,
        data.desc_prod_plan,
        data.linea_name,
        data.linea_cc,
        data.cant_plan,
        data.units_cant_plan,
        data.date_start,
        data.date_end,
      ]
    );
    if (poolPlan) {
      queryPlan = true;
    } else {
      queryPlan = false;
    }

    socket.emit("server:plan_query", queryPlan);
  });
  //////////////////////
  socket.on("client:chart", async () => {
    console.log("recibido");
    const [selectAll] = await pool.query("select * from planner ");

    socket.emit("server:chart", selectAll);
  });
});

////////////////io para la plantilla admin/////////////////////

io.on("connection", (socketadmin) => {
  socketadmin.on("client:admin-ingresar-prod", async (data) => {
    const [validation] = await pool.query(
      "select  * from productos where code_prod=?",
      data.codigo
    );
    console.log(data.codigo, 138);
    console.log(validation, 139);
    if (validation == "") {
      await pool.query(
        "insert into productos(code_prod,desc_prod,aph,apd) values (?,?,?,?)",
        [data.codigo, data.description, data.undHora, data.undTurno]
      );
      socketadmin.emit(
        "resAddValProd",
        "Producto agregado exitosamente, por favor recarge la página"
      );
    } else {
      socketadmin.emit("resAddValProd", "Error: El producto ya existe");
    }
  });

  socketadmin.on("client:loadpage", async () => {
    const [listProd] = await pool.query("select * from productos");
    socketadmin.emit("server:loadpage", listProd);
    console.log(listProd, "144");
  });

  socketadmin.on("client:deleteProd", async (data) => {
    await pool.query("delete from productos where code_prod=?", data);
    console.log(data, "149");
  });

  ////ingreso de personas a la base dedatos
  socketadmin.on("client:selectUsers", async () => {
    const [resultquery] = await pool.query("select * from usuarios");

    socketadmin.emit("server:selectUsers", resultquery);
    //console.log(resultquery ,"156")
  });
  //validar si usuario existe

  socketadmin.on("client:validatePerson", async (datos) => {
    const [validacion] = await pool.query(
      "select * from usuarios where cedula=?",
      datos.cedula
    );

    console.log(validacion, "175");

    if (validacion == "") {
      await pool.query(
        "insert into usuarios (cedula,nombres,rol,password) values (?,?,?,?)",
        [datos.cedula, datos.nombres, datos.rol, datos.password]
      );

      socketadmin.emit(
        "server:resValidation",
        "Usuario agregado correctamente"
      );
    } else {
      socketadmin.emit("server:resValidation", "El usuario ya existe");
    }
  });

  socketadmin.on("client:deletePerson", (data) => {
    pool.query("delete from usuarios where cedula=?", data);
  });

  socketadmin.on("client:deletePersonById", (data) => {
    console.log(data);
    pool.query("delete from usuarios where cedula=?", data);
  });

  socketadmin.on("client:editPerson", async (data) => {
    // console.log(data)
    let [edit] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    console.log(edit);

    socketadmin.emit("server:dataEdit", edit[0]);
  });

  //para validar la pestañade mp

  socketadmin.on("client:mpdata", async (datamp) => {
    console.log(datamp, "226");
    const [resMp] = await pool.query(
      "select * from materiaPrima where codigo=?",
      datamp.codigo
    );

    console.log(resMp, "229");
    if (resMp == "") {
      await pool.query(
        "insert into materiaPrima(codigo,nombre,proveedor,familia,categoria) values(?,?,?,?,?)",
        [
          datamp.codigo,
          datamp.nombreMp,
          datamp.proveedor,
          datamp.famMp,
          datamp.famcat,
        ]
      );

      socketadmin.emit("server:resultMp", "Registro agregado exitosamente");
    } else {
      socketadmin.emit("server:resultMp", "La materia prima ya existe");
    }
  });

  socketadmin.on("client:mpLoadList", async () => {
    const [resultListMp] = await pool.query("select * from materiaPrima");
    console.log(resultListMp);
    socketadmin.emit("server:dbList", resultListMp);
  });

  socketadmin.on("client:deleteMp", async (data) => {
    await pool.query("delete from materiaPrima where codigo=?", data);
    console.log(data);
  });

  ///pesataña suministros de pagina admin
  socketadmin.on("client:saveSum",async data=>{
    console.log(data)
   const [sumval]= await pool.query("select * from suministro where codigo=?",data.codigo)

   if (sumval=="") {
   await pool.query("insert into suministro(codigo,proveedor,descripcion,undMedida,fechaCre) values (?,?,?,?,?) ",[data.codigo,data.proveedor,data.descripcion,data.undMedida,data.fecha_creacion])

   socketadmin.emit("server:valSum","Datos registrados exitosamente")
   } else {
    socketadmin.emit("server:valSum","Error:El suministro ya existe")
   }


  })

socketadmin.on("client:dataSumAll",async()=>{
 const [suministros]= await pool.query("select * from suministro")
 console.log(suministros)
 if (suministros!="") {
  socketadmin.emit("server:suministros",suministros)
 }
})

socketadmin.on("client:deleteSum",  (data)=>{

  pool.query("delete from suministro where codigo=?",data)

})



});
