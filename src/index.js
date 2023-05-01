const express = require("express"); //se importa express para iniciar el server-----------------------
const http = require("http");//----------
const exphbs = require("express-handlebars"); //permite renderizar hbs
const morgan = require("morgan"); //crea logs de las peticiones del cliente al servidor
const path = require("path"); // permite manejar rutas internas de archivos-------------
const PORT=process.env.PORT || 5000
const realTimeServer=require("./sockets.js")
//BASE DE DATOS

//INICIALIZACIONES
const app = express(); //se inicializa express------------------

//pasando el server a http

const httpServer = http.createServer(app);

//static files
app.use(express.static(path.join(__dirname, "public")));


//SETTINGS

app.set("port", PORT);




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



//ROUTES

app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/app", require("./routes/app"));

//STARTING THE SERVER con express

httpServer.listen(app.get("port"));
console.log(`server on port, ${app.get("port")}`);

//websockets
realTimeServer(httpServer)
