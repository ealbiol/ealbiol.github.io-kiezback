require("./config/config");
//---> Importamos todas las variables de entorno que vamos guardando en el archivo config.js


const cors = require('cors')
const mongoose = require("mongoose")                                            //---> Importamos mongoose        
const express = require("express")                                              //---> Importamos express guardándolo en una variable ya que saldrán varias cosas de expres.
const app = express()                                                           //---> Route: Creamos la constante app (se suele poner este nombre) que va a ser lo que hemos importado en express pero llamandolo. Creará la aplicación web.


const users = require("./routes/users");                                        //---> Importamos users.js (en carpeta router) ya que todos los endpoints tienen que pasar por server.js  . Declaramos una variable que guardará la ruta de users.
const neighborhoods = require("./routes/neighborhoods");
const coatsOfArmsImages = require("./routes/coatsOfArmsImages");
const technologies = require("./routes/technologies");
const adminUsers = require("./routes/adminUsers")
const neighborhoodsProperties = require("./routes/neighborhoodsProperties")


//Antes de los endpoints, usamos loss Middlewares
app.use(express.json());                                                        //---> El servidor recibirá esta información en tipo json pero queremos que el servidor la reciba como un objeto de JS, como un array de objetos. Para eso se usan los middleware. Middleware transformará la info .json en array de objetos de JS. Lo haremos con express.json().
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(cors());
//


//ENDPOINTS per FAMILY
app.use("/users", users)                                                       //---> Route: Después del json aquí añadimos que el grupo entero de endpoints 'users' queremos que esten dentro de la ruta /users. Así se crean directamente y no tenemos que poner /users en users.js  . Le pasamos la ruta que esta guardada en la variable users.
app.use("/neighborhoods", neighborhoods)
app.use("/coatsOfArmsImages", coatsOfArmsImages)
app.use("/technologies", technologies)
app.use("/adminUsers", adminUsers)                                                       //---> Route: Después del json aquí añadimos que el grupo entero de endpoints 'users' queremos que esten dentro de la ruta /users. Así se crean directamente y no tenemos que poner /users en users.js  . Le pasamos la ruta que esta guardada en la variable users.
app.use("/neighborhoodsProperties", neighborhoodsProperties)

//



//Mongoose connection to MongoDB
mongoose.connect("mongodb+srv://ealbiol:Testtest11@cluster0.kuhaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {                           //---> Conexión con MongoDB. localhost porque estamos en localhost, 27017 es el puerto de mongodb y users es la base de datos en MongoDB con la que queremos conectarnos.
    useNewUrlParser: true,                                                      //---> Opciones que no hace falta aprenderse.
    useUnifiedTopology: true,                                                   //---> Opciones que no hace falta aprenderse.
    useCreateIndex: true,
    ignoreUndefined: true                                                    //---> Opciones que no hace falta aprenderse.
});

const db = mongoose.connection;                                                 //---> feedback para ver que la conexión con mongoose a MongoDB está funcionando:

db.on("error", err => console.log("Connection to MongoDB failed: ", err));           //---> mensaje que nos aparecerá si la conexión a mongoDB no ha funcionado.
db.once("open", () => console.log("Connected to MongoDB succesfuly"));               //---> mensaje que nos aparecerá si la conexión a mongoDB ha funcionado.
//


//Puerto a la escucha: http://localhost:3000/
app.listen(process.env.PORT, () => {
    console.log("Listening on port --->", process.env.PORT);                    //---> Console.log para ver que se levanta el puerto bien
})
//



// BBDD Numeros
















// let users = [];

// //Petición GET
// app.get("/", (req, res) => {
//     const user = {name: "John", email: "john@gmail.com"}
//     res.json({ ok: true, results: users })               //---> cambiando .send() por .json() en cliente veremos el texto en tipo JSON (como se ve una API) en lugar de texto plano.
// });                                                                              //---> Le ponemos un objeto. Ej: "mensaje" : "Hola mundo"


// //Petición GET con parámetro
// app.get("/:id", (req, res) => {
//     let id = req.params.id;                                                     //---> Accediendo por parámetros
//     res.json({ mensaje: `Petición GET con parámetro: ${id}` })                 
// });

// //Petición PUT (actualizar)
// app.put("/:id", (req, res) => {
//     const id = req.params.id;

//     res.json({id})
// });

// //Petición DELETE
// app.delete("/:id", (req, res) => {
//     const id = req.params.id;

//     const removedUser = users.splice(id, 1)                 // ---> Hacemos un splice del user que queremos eliminar. Ponemos elmétodo post y el número en el array del usuario que queremos eliminar. .splice(id, 1) ---> Este 1 significa cuantos queremos eliminarnos. No el número del usuario en el array.

//     res.status(200).json({removedUser})                     // ---> Devolvemos al cliente la info del usuario eliminado.
// });


// //Petición POST
// app.post("/", (req, res) => {
//     let body = req.body;                                                        //---> Se accede a la info a traves de body. Ej: body.name

//     if (!body.name) {
//         res.status(400).json({ ok: false, message: `Name is required` })
//     } else {
//         users.push(body)
//         res.status(201).json({user: body})
//     }
// });