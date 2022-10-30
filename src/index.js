const express = require('express') //se importa express para iniciar el server
const path=require('path')// permite manejar rutas internas de archivos
const exphbs=require('express-handlebars')//permite renderizar hbs
const morgan=require('morgan')//crea logs de las peticiones del cliente al servidor

//INICIALIZACIONES
const app=express() //se inicializa express




//SETTINGS

///se establece el puerto en el cual va ha estar en modo escucha el server con la tecla "alt +124 = ||"" se puede hacer el o lógico.

app.set("port",process.env.PORT || 5000)
///// se configuar las carpetas con los "hbs" para ser cargado cada ves que se haga una peticion del cliente/////
app.set("views",path.join(__dirname,"views"))
app.engine(
    ".hbs",
    exphbs.engine({
        defaultLayout:"main",
        layoutsDir:path.join(app.get("views"),"layouts"),
        partialsDir:path.join(app.get("views"),"partials"),
        extname:".hbs"

    })
) 
app.set("view engine",".hbs")

///MIDDLEWARES

app.use(morgan('dev'))


//ROUTES

///// se importara el archivo index de la carpeta routes que sera el inicializador de la app web
app.use(require("./routes"))
app.use(require("./routes/authentication"))

//FILES PUBLIC
app.use(express.static(path.join(__dirname,"public")))

//STARTING THE SERVER
/////iniciamos el server en el puerto presviamente establecido ////
app.listen(app.get("port"))
console.log("server on port" ,app.get("port"))