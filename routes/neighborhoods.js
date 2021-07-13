const express = require("express");
const ramda = require("ramda");
const router = express.Router();

const Neighborhood = require("../models/neighborhood");

const verifyToken = require("../middlewares/auth") // Traemos el middleware Auth.js para las autoricaciones de accesos.



///
// API : http://localhost:3000/neibourhoods -> Servicio
// -> Operaciones
//  Si no pones nada más accedes a  http://localhost:3000/neibourhoods
//  GET , POST , PUT , DELETE
// CRUD -< POST , GET, PUT, DELETE
// Necesitas otro post -> Datos pero filtrados
// Cada operacion debe tener un nombre diferente
// http://localhost:3000/neibourhoods/create-neibourhood
// http://localhost:3000/neibourhoods/get-neibourhoods
// 1 - Modificar este request para que devuelva los barrios filtrados






/*
Explicación token con cookie en SERVIDOR :
1. El token da acceso a API's.
2. Estamos en la API neighborhoods. Aquí importamos la constante VerifyToken que viene de auth.js 
---> const verifyToken = require("../middlewares/auth")
3. Por ejemplo para el GET de esta API añadimos la const verifyToken 
---> router.get("/", verifyToken, (req, res) => { 


Explicación token con cookie en CLIENTE:

En el componente donde se hace fetch a la api: 

1. Inicializamos la const token:
---> const token = localStorage.getItem("ACCESS_TOKEN")
2. Creación cookie que contiene el token. El token esta disponible en todo el cliente:
---> En login  localStorage.setItem("ACCESS_TOKEN", data.token)
3. Añadimos la cabecera (en este ejemplo en coatsOfArmsImages.js) en cada fetch donde queramos que se requiera la autorización:

const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token                          //Autorización con token para el acceso a la API 'coatsofarmsimages'
      },
    };
    fetch(API_COATSOFARMSIMAGES, params)
*/





//---> G E T
router.get("/", verifyToken, (req, res) => {                  // Añadimos verifyToken para dar acceso si se tiene token
  Neighborhood.find({}).exec((error, neighborhoods) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, neighborhoods });
    }
  });
});

router.get("/kiez/withParams/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  Neighborhood.find({}).exec((error, neighborhoods) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, neighborhoods });
    }
  });
});

// - 2 - Crear un nuevo GET que obtenga los barrios filtrados
//---> G E T
router.post("/filtered", verifyToken, (req, res) => {
  let {
    district,
    architecturePredominance,
    internationality,
    partyWinner,
    transportZone,
    activityRate,
    lifeCost,
    inhabitantsDensity,
    citizenAverageAge,
    gymDensity,
    restaurantsDensity,
    supermarketsDensity,
    cinemas,
    museums,
    nightLife,
    airQuality,
    cleanness,
    greenAreasDensity,
    noiseLevel,
    safety,
    privateParkingDensity,
    busLines,
    parkingStreetSlots,
  } = req.body;
  console.log(req.body);
  /*
        switch(inhabitantsDensity){
            case "Low":
                $contains: "Low"
            case "Medium":
                $contains: {"Low", "Medium"}
                break
        }*/
  // 111 .- Recibir parametros e imprimirlos
  //console.log(req.body);
  // res.status(200).json({ok: true})
  // 1- Recibir parametros por el req
  // 2- Utilizar parametros en el find
  Neighborhood.find({
    "district.name": district,
    "architecturePredominance.name": architecturePredominance,
    internationality: internationality,
    "partyWinner.name": partyWinner?.toLowerCase(),
    "transportZone.name": transportZone,
    "activityRate.name": activityRate,
    "lifeCost.name": lifeCost,
    inhabitantsDensity: inhabitantsDensity,
    citizenAverageAge: citizenAverageAge,
    gymDensity: gymDensity,
    "restaurantsDensity.name": restaurantsDensity,
    "supermarketsDensity.name": supermarketsDensity,
    "cinemas.name": cinemas,
    "museums.name": museums,
    "nightLife.name": nightLife,
    airQuality: airQuality,
    "cleanness.name": cleanness,
    greenAreasDensity: greenAreasDensity,
    "noiseLevel.name": noiseLevel,
    safety: safety,
    privateParkingDensity: privateParkingDensity,
    busLines: busLines,
    parkingStreetSlots: parkingStreetSlots,
    // "ubahnLines.name": body.ubahnLines,
    // "sbahnLines.name": body.sbahnLines,
  }).exec((error, neighborhoods) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, neighborhoods });
    }
  });
});



//ID per NEIGHBORHOOD
router.get("/:nombreBarrio", verifyToken, (req, res) => {
  const nombreBarrio = req.params.nombreBarrio;
  console.log(nombreBarrio)
  Neighborhood.findOne({ name: nombreBarrio }, (err, result) => {
    console.log("Err&Result", err, result)
    if (err) {
      res.status(400).json({ ok: false, error });
    } else {
      if (result === null) {
        res.status(400).json({ ok: false });
      } else {

        res.status(200).json({ ok: true, result });
      }
    }
  });
});

/*
1. Creamos el endpoint con método GET con los ':' para que sea un parámetro --> router.get("/:nombreBarrio", (req,res)=>{
(El nombre del endpoint es el que quieras, en este caso, 'nombreBarrio')
2. Creamos el componente de react (ir a cliente)
3. Creamos una const. Es para almacenar el valor del parametro que llega por la url:
Ejemplo: nombreBarrio === Mitte.
http://localhost:3000/neighborhoods/{nombreBarrio} === http://localhost:3000/neighborhoods/Mitte
4. De la colección Neighborhood buscamos con 'findOne()' aquel barrio con el nombre que coincida con el que nos pasan por parámetro. Como sabemos
que solo habrá una coincidencia usamos el método findOne(). Si hubiesen más usaríamos find(), etc.

Parte del front:
0. En Router colocar el parametro. Su nombre tiene que ser el mismo que usaremos en 
en useParams. En este caso 'nombreBarrio --> <Route path="/neighborhoodprofile/:nombreBarrio" component={NeighborhoodProfile}/>
1. Usar el hook useParams con el mismo nombre dado en Route.
2. En el fetch la url será la misma que la que usamos en el back: http://localhost:3000/neighborhoods/{nombreBarrio} pero con el string template (`` y ${}):
`http://localhost:3000/neighborhoods/${nombreBarrio}`

3. Para entrar en la api tenemos que declarar el estado inicial de useState como un objecto vacío.
4. En el segundo .then entrar en este caso data.result ya que hay dos objetos.

(Mirar ejercicio 7 (moviedatabase) como referencia si es necesario)

Final: De este modo recibimos el objeto del barrio al colocal el nombre del mismo por endpoint en el url.
Ejemplo API: http://localhost:3000/neighborhoods/Mitte
Ejemplo Front: http://localhost:3001/neighborhoodprofile/Mitte
*/







//---> P U T
router.put("/deactivate", verifyToken, (req, res) => {
  const { neighborhoods } = req.body;
  console.log(neighborhoods);
  let result = Neighborhood.updateMany({ name: { $all: neighborhoods } }, { $set: { active: false } });
  console.log(result);
  /*.exec((error, neighborhoods) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, neighborhoods });
    }
  });*/
});


module.exports = router;
