const express = require("express"); 
const http = require("http");
const exphbs = require("express-handlebars"); 
const morgan = require("morgan"); 
const path = require("path");
const PORT=process.env.PORT || 5000
const realTimeServer=require("./sockets.js")


//INICIALIZACIONES
const app = express(); 

//pasando el server a http

const httpServer = http.createServer(app);

//static files
app.use(express.static(path.join(__dirname, "public")));


//SETTINGS

app.set("port", PORT);

//  "hbs"
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
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
//GLOBAL VARIABLES



//ROUTES

app.use(require("./routes"));


//STARTING THE SERVER con express


httpServer.listen(app.get("port"));
console.log(`server on port, ${app.get("port")}`);

//websockets
realTimeServer(httpServer)

