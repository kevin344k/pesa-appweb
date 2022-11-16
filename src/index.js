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

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("nueva conexión");
  //para buscar el codigo de producto en planner
socket.on("cliente:plannerId",async()=>{
const [plannerId]=await pool.query('select id_plan from planner')
console.log(plannerId)
socket.emit("server:plannerId",plannerId[0])
})



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
    const [descProd] = await pool.query("select desc_prod from productos where code_prod=?",data);

    socket.emit("descP", descProd[0],data);
  });


  socket.on("client:plannerSave",(data)=>{
    console.log(data)
  })
  //////////////////////
});
