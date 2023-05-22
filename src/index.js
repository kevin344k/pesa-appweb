const express = require("express");
const { createServer } = require("http");
const { Server } = require('socket.io');
const pool = require("./db.js");
const database = require("./db.js");
const exphbs = require("express-handlebars");
const {engine}=require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport")
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser=require('body-parser')
const mysqlStore = require("express-mysql-session")(session)

const options={
    host: process.env.DB_HOST || 'containers-us-west-114.railway.app',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'JwvlLf417IRcpdHVBjOB',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_HOST || '6760'
  }
const sessionStore=new mysqlStore(options)

//INICIALIZACIONES
const app = express();

//pasando el server a http

const httpServer = createServer(app);
const io = new Server(httpServer);

//static files
app.use(express.static(path.join(__dirname, "public")));

//SETTINGS
const PORT = process.env.PORT || 5000
app.set("port", PORT);


//  "hbs"
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");
///MIDDLEWARES

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

  app.use(session({
  secret: "mySecret",
  resave: true,
  saveUninitialized: true,
  store: sessionStore
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
//GLOBAL VARIABLES
app.use((req,res,next)=>{
  app.locals.failed=req.flash('failed')
  app.locals.success=req.flash('success')
  app.locals.message=req.flash('message')
  app.locals.user=req.user
  
  
console.log( app.locals.user,'data de profile user')
  next()
  
})
//ROUTES
require('./lib/passport')
app.use(require("./routes"));


//STARTING THE SERVER con express


httpServer.listen(app.get("port"));
console.log(`server on port, ${app.get("port")}`);

//websockets

io.on("connection", (socket) => {
  console.log("nueva conexión", socket.id);
  //para buscar el codigo de producto en planner
  socket.on("client:plannerId", async () => {
    const [plannerId] = await pool.query(
      " SELECT id_plan FROM planner order by id_plan desc"
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
      "select * from productos where code_prod=?",
      data
    );

    socket.emit("descP", descProd[0], data);
  });

  socket.on("client:plannerSave", async (data) => {
    console.log(data);

    const poolPlan = await pool.query(
      "insert into planner (code_prod,desc_prod_plan,linea_name,linea_cc,cant_plan,units_cant_plan,date_start,date_end) values (?,?,?,?,?,?,?,?) ",
      [
        data.cod_prod,
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
    const [selectAll] = await pool.query("select * from planner inner join  orden_produccion on planner.id_plan=orden_produccion.id_plan");

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
        "insert into productos(code_prod,desc_prod,aph,apd,unidadMedida) values (?,?,?,?,?)",
        [
          data.codigo,
          data.description,
          data.undHora,
          data.undTurno,
          data.undMedida,
        ]
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
  socketadmin.on("client:saveSum", async (data) => {
    console.log(data);
    const [sumval] = await pool.query(
      "select * from suministro where codigo=?",
      data.codigo
    );

    if (sumval == "") {
      await pool.query(
        "insert into suministro(codigo,proveedor,descripcion,undMedida,fechaCre) values (?,?,?,?,?) ",
        [
          data.codigo,
          data.proveedor,
          data.descripcion,
          data.undMedida,
          data.fecha_creacion,
        ]
      );

      socketadmin.emit("server:valSum", "Datos registrados exitosamente");
    } else {
      socketadmin.emit("server:valSum", "Error:El suministro ya existe");
    }
  });

  socketadmin.on("client:dataSumAll", async () => {
    const [suministros] = await pool.query("select * from suministro");
    console.log(suministros);
    if (suministros != "") {
      socketadmin.emit("server:suministros", suministros);
    }
  });

  socketadmin.on("client:deleteSum", (data) => {
    pool.query("delete from suministro where codigo=?", data);
  });
});

/////////////////io para la pagina orden de planeación

io.on("connection", (socketOrden) => {
  socketOrden.on("client:dataPlanId", async () => {
    // const [selectPlanner]=await pool.query("select id_plan,DATE_FORMAT(date_start,'%Y-%m-%d') as dateStart,code_prod,desc_prod_plan,cant_plan,units_cant_plan from planner")

    const [selectPlanner2] = await pool.query(
      "select *,DATE_FORMAT(date_start,'%Y-%m-%d') as dateStart from planner inner join productos on planner.code_prod=productos.code_prod"
    );
    console.log(selectPlanner2);
    if (selectPlanner2 != "") {
      socketOrden.emit("server:resultPlanner", selectPlanner2);
    }
  });

  socketOrden.on("client:dataPlanLoad", async (data) => {
    const [dataforOrder] = await pool.query(
      "select *,DATE_FORMAT(date_start,'%Y-%m-%d') as dateStart from planner inner join productos on planner.code_prod=productos.code_prod where id_plan=?",
      data
    );
    if (dataforOrder != "") {
      socketOrden.emit("server:resultPlannerData", dataforOrder[0]);
      console.log(dataforOrder, 309);
    }
  });

  socketOrden.on("client:mpLoad", async () => {
    const [mpData] = await pool.query("select * from materiaPrima");
    socketOrden.emit("server:mpLoad", mpData);
  });

  //codigo para cargar mp al formurio orden de produccion

  socketOrden.on("client:dataMp", async (data) => {
    const [selectCodeMp] = await pool.query(
      "select * from materiaPrima where codigo=?",
      data
    );
    socketOrden.emit("server:mpLoadatForm", selectCodeMp[0]);
  });

  socketOrden.on("client:numOrder", async () => {
    const numOrder = await pool.query(
      "SELECT num_orden FROM orden_produccion order by num_orden DESC;"
    );
    socketOrden.emit("server:numOrder", numOrder[0]);

    console.log(numOrder[0]);
  });

  socketOrden.on("client:sumLoad", async () => {
    const [sum] = await pool.query("select * from suministro");
    socketOrden.emit("server:sumLoad", sum);
  });

  socketOrden.on("client:inputCodeSearchMp", async (data) => {
    console.log(data);

    const [sumSelect] = await pool.query(
      "select * from suministro where codigo=?",
      data
    );
    const [mpSelect] = await pool.query(
      "select * from materiaPrima where codigo=?",
      data
    );
    console.log(sumSelect, mpSelect, 330);
    if ((sumSelect == "") & (mpSelect == "")) {
      socketOrden.emit("server:selectSumMp", "Error ese item no existe");
    } else if (sumSelect != "") {
      socketOrden.emit("server:selectSum", sumSelect[0]);
    } else if (mpSelect != "") {
      socketOrden.emit("server:selectMp", mpSelect[0]);
    }
  });

  socketOrden.on("client:dataOrder", async (codigo) => {
    const [result] = await pool.query(
      "select * from suministro where codigo=?",
      codigo
    );

    socketOrden.emit("server:dataResult", result[0]);
  });

  socketOrden.on("client:dataOrdenProd", async (data) => {
    await pool.query(
      "insert into orden_produccion (num_orden,linea, centro_costo, articulo, codigo_articulo, peso, und_medida, total_a_fabricar, por_turno, por_hora, ciclo, codeMpSn1,codeMpSn2, codeMpSn3, codeMpSn4, descMpSn1, descMpSn2, descMpSn3, descMpSn4, cantidadMpSn1, cantidadMpSn2, cantidadMpSn3, cantidadMpSn4, undMpSn1, undMpSn2, undMpSn3, undMpSn4, note,id_plan,fechaCreacion,horaCreacion,missing)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.spanOrder,
        data.nombre_linea,
        data.centro_costo,
        data.nombre_articulo,
        data.cod_articulo,
        data.peso_Art,
        data.undmedida,
        data.cantidad,
        data.porTurno,
        data.porHora,
        data.ciclo,

        data.codeMp1,
        data.codeMp2,
        data.codeMp3,
        data.codeMp4,

        data.descMp1,
        data.descMp2,
        data.descMp3,
        data.descMp4,

        data.cantidadMp1,
        data.cantidadMp2,
        data.cantidadMp3,
        data.cantidadMp4,

        data.undSpan1,
        data.undSpan2,
        data.undSpan3,
        data.undSpan4,

        data.floatingTextarea2,

        data.id_plandbs,
        data.fechaCreacion,
        data.horaCreacion,
        data.cantidad,
      ]
    );

    console.log(data, "379");
  });
});

///io para la pagina informe de operador ////
io.of("/informeOP").on("connection", (socketInfor) => {
  socketInfor.on("client:SearchByCedula", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );

    socketInfor.emit("server:searchByCedulaResult", dataSelectUser[0]);
  });

  //numero de informe

  socketInfor.on("client:numInfor", async () => {
    const [selectInforOper] = await pool.query(
      "select num_infor from inforOper order by num_infor DESC"
    );

    socketInfor.emit("server:numInfor", selectInforOper[0]);
  });

  //segundo campo de people

  socketInfor.on("client:SearchByCedula2", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult2", dataSelectUser[0]);
  });

  socketInfor.on("client:SearchByCedula2", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult2", dataSelectUser[0]);
  });

  //tercer campo de personal

  socketInfor.on("client:SearchByCedula3", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult3", dataSelectUser[0]);
  });

  socketInfor.on("client:SearchByCedula3", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult3", dataSelectUser[0]);
  });

  //cuarto campo de personal

  socketInfor.on("client:SearchByCedula4", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult4", dataSelectUser[0]);
  });

  socketInfor.on("client:SearchByCedula4", async (data) => {
    const [dataSelectUser] = await pool.query(
      "select * from usuarios where cedula=?",
      data
    );
    socketInfor.emit("server:searchByCedulaResult4", dataSelectUser[0]);
  });

  //codigo para realizar el order list
  socketInfor.on("client:SelectOrderList", async () => {
    const [selectOrdenList] = await pool.query(
      "select num_orden,linea,codigo_articulo,articulo,total_a_fabricar,missing from orden_produccion where missing<=total_a_fabricar order by num_orden desc"
    );

    socketInfor.emit("server:selectOrderList", selectOrdenList);
  });

  socketInfor.on("client:idOrderList", async (data) => {
    console.log(data);
    const [selectOrder] = await pool.query(
      "select * from orden_produccion where num_orden=?",
      data
    );

    console.log(selectOrder[0], "517");

    socketInfor.emit("server:resultSelectOrder", selectOrder[0]);
  });

  //codigo para cargar los cxodigos de paralizaciones

  socketInfor.on("client:selectCodPar", async () => {
    const [selectPar] = await pool.query("select * from cod_Paralizaciones");

    socketInfor.emit("server:selectCodPar", selectPar);
  });

  socketInfor.on("client:searchCodeP", async (data) => {
    const [dataPar] = await pool.query(
      "select * from cod_Paralizaciones where cod_paro=?",
      data
    );

    socketInfor.emit("server:searchCodeP", dataPar[0]);
  });

  socketInfor.on("client:codePar", async (data) => {
    const [dataPar2] = await pool.query(
      "select * from cod_Paralizaciones where cod_paro=?",
      data
    );
    socketInfor.emit("server:codePar", dataPar2[0]);
  });

  //codigo para traer y guaradar la información del inforOper

  socketInfor.on("client:dataInforOper", async (data) => {
    console.log(data);

    await pool.query(
      "insert into inforOper (fechaRegistroInfor,horaRegistro,turnoRegistro,cedula1,nombre1,rol1,cedula2,nombre2,rol2,cedula3,nombre3,rol3,cedula4,nombre4,rol4,codePar1,descPar1,timeStar1,timeEnd1,codePar2,descPar2,timeStar2,timeEnd2,codePar3,descPar3,timeStar3,timeEnd3,codePar4,descPar4,timeStar4,timeEnd4,UnitsGood,Scrap,textAreaObservations,num_orden)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        //falta agregar a la tabla en sql los cuatro campos de abajo guapo///
        data.fechaRegInfor,
        data.horaRegInfor,
        data.turnoRegInfor,

        data.cedula1,
        data.nombre1,
        data.rol1,

        data.cedula2,
        data.nombre2,
        data.rol2,

        data.cedula3,
        data.nombre3,
        data.rol3,

        data.cedula4,
        data.nombre4,
        data.rol4,

        data.codePar1,
        data.descPar1,
        data.timeStar1,
        data.timeEnd1,

        data.codePar2,
        data.descPar2,
        data.timeStar2,
        data.timeEnd2,

        data.codePar3,
        data.descPar3,
        data.timeStar3,
        data.timeEnd3,

        data.codePar4,
        data.descPar4,
        data.timeStar4,
        data.timeEnd4,

        data.unitsGood,
        data.Scrap,
        data.textAreaObservations,
        data.OrderNumber,
      ]
    );
const [selectProd] =await pool.query("select total_a_fabricar,missing from orden_produccion where num_orden=?",[data.OrderNumber])

    //const miss=

    console.log(data.unitsGood+selectProd[0].missing,"orden de produccion")
    
await pool.query("update orden_produccion set missing=? where num_orden=?",[(parseInt(data.unitsGood)+parseInt(selectProd[0].missing)),data.OrderNumber])


    
  });

  //codigo para el tiempo real de las máquinas
  socketInfor.on("run", async data => {
    console.log(data)
    const editStatus = await pool.query("update realTimeLine set status=?,status_dateUpdate=? where cc=?", [data.status, data.status_upDate, data.linea])
  })
  socketInfor.on("stop", async data => {
    console.log(data)
    const editStatus = await pool.query("update realTimeLine set status=?,status_dateUpdate=? where cc=?", [data.status, data.status_upDate, data.linea])
  })
  socketInfor.on("switch", async data => {
    console.log(data)
    const editStatus = await pool.query("update realTimeLine set status=?,status_dateUpdate=? where cc=?", [data.status, data.status_upDate, data.linea])
  })
  socketInfor.on("notOP", async data => {
    console.log(data)
    const editStatus = await pool.query("update realTimeLine set status=?,status_dateUpdate=? where cc=?", [data.status, data.status_upDate, data.linea])
  })
});

//io para la pagina DASH
io.of("/dashboard").on("connection", (socketDash) => {
  socketDash.on("dash:dates", async data => {
    console.log(data)
    const [result] = await pool.query("select linea,articulo,UnitsGood,por_turno,codePar1,descPar1,timeStar1,timeEnd1,codePar2,descPar2,timeStar2,timeEnd2,codePar3,descPar3,timeStar3,timeEnd3,codePar4,descPar4,timeStar4,timeEnd4, round(((UnitsGood*100)/por_turno),1) AS EFICIENCIA  from inforOper INNER JOIN orden_produccion ON inforOper.num_orden=orden_produccion.num_orden where   fechaRegistroInfor BETWEEN ? AND  ?", [data.date_Start, data.date_End])



    socketDash.emit("dash:server:resultDates", (result))
  })

  //codigo para mostrar en timpo real las maquinas

  socketDash.on("getRealTime", async () => {
    const [query] = await pool.query("select * from realTimeLine")

    let query1 = []
    for (i = 0; i <= query.length - 1; i++) {
      query1.push(query[i].status)
    }
    console.log(query1, 654)





    setInterval(async () => {
      let query2 = []
      let [detectChange] = await pool.query("select status from realTimeLine")

      if (detectChange.length > 0) {
        for (i = 0; i <= detectChange.length - 1; i++) {
          query2.push(detectChange[i].status)

        }
        console.log(query2, 660)
        compareArr(query2)
      }

    }, 10000)


    function compareArr(q2) {

      socketDash.emit("updateStatus", q2)
    }




    socketDash.emit("postRealtime", query)

  })

})








