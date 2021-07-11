// SCHEMA DE LA COLECCIÓN users
//Guardamos cada colección en la carpeta models. Significa la representación de una entidad en la base de datos. Ejemplo: productos, usuarios, etc

//Schema de la colección 'users' que tenemos en MongoDB.
//Otros ejemplos de esquemas: productos, coches, etc

//En Schema decidimos el tipado de la colección correspondiente.

const mongoose = require("mongoose"); //---> Importamos mongoose.

const uniqueValidator = require("mongoose-unique-validator"); //---> Importamos mongoose-unique-validator. Nos sirve para que el mensaje de error de unique sea más entendible. Nada más.

let Schema = mongoose.Schema; //---> Creamos un Schema (está guardado en mongoose, es la herramienta que nos da mongoose para crear schemas)

let neighborhoodSchema = new Schema({
  //---> Creamos el Schema para la colección users.
  //---> Dentro del Schema ponemos todas las propiedades que tendrá está entidad/colección (user).

  district: {
    name: {
      type: String,
      // unique: true, //---> Si el email ya existe saltará un error informando que este email ya existe.
      required: [true, "Neighborhood name is required"],
    }, //---> Si no ponemos required por defecto no lo será. El string después del true es el mensaje de error que aparecerá si el usuario no pone el username.

    image: {
      type: String,
      // required: [true, "Neighborhood image is required"],
    },
  },

  name: {
    type: String,
    required: [true, "Name is required"],
  },

  architecturePredominance: {
    name: {
      type: String,
      required: [true, "Architecture Predominance name is required"],
    },

    image: {
      type: String,
      // required: [
      //   true,
      //   "Architecture Predominance image of Old Town is required",
      // ],
    },
  },

  internationality: {
    type: Number,
    required: [true, "Internationality is required"],
  },

  partyWinner: {
    name: {
      type: String,
      required: [true, "Party Winner Name is required"],
    },
    color: {
      type: String,
      // required: [true, "Party Winner Color is required"],
    },
    image: {
      type: String,
      // required: [true, "Party Winner Image is required"],
    },
  },

  transportZone: {
    name: {
      type: String,
      required: [true, "Transport Zone Name is required"],
    },

    color: {
      type: String,
      // required: [true, "Transport Zone Color is required"],
    },
  },

  activityRate: {
    name: {
      type: String,
      required: [true, "Activity Name Rate is required"],
    },

    image: {
      type: String,
      // required: [true, "Activity Rate Image is required"],
    },
  },

  lifeCost: {
    name: {
      type: String,
      required: [true, "Life Cost is required"],
    },
    image: {
      type: String,
      // required: [true, "Life Cost is required"],
    },
  },

  inhabitantsDensity: {
    type: String,
    required: [true, "Inhabitants Density is required"],
  },

  citizenAverageAge: {
    type: String,
    required: [true, "Citizen Average Age is required"],
  },

  gymDensity: {
    type: String,
    required: [true, "Gym Density is required"],
  },

  restaurantsDensity: {
    name: {
      type: String,
      required: [true, "Restaurants Density Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Restaurants Density Image is required"],
    },
  },

  supermarketsDensity: {
    name: {
      type: String,
      required: [true, "Supermarkets Density Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Supermarkets Density Image is required"],
    },
  },

  cinemas: {
    name: {
      type: Number,
      required: [true, "Cinemas Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Cinemas Image is required"],
    },
  },

  museums: {
    name: {
      type: Number,
      required: [true, "Museums Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Museums Image is required"],
    },
  },

  nightLife: {
    name: {
      type: String,
      required: [true, "Night Life Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Night Life Image is required"],
    },
  },

  airQuality: {
    type: String,
    required: [true, "Air Quality is required"],
  },

  cleanness: {
    name: {
      type: String,
      required: [true, "Cleanness is required"],
    },
    image: {
      type: String,
      // required: [true, "Cleanness is required"],
    },
  },

  greenAreasDensity: {
    type: String,
    required: [true, "Green Areas Density is required"],
  },
  noiseLevel: {
    name: {
      type: String,
      required: [true, "Noise Level Name is required"],
    },
    image: {
      type: String,
      // required: [true, "Noise Level Image is required"],
    },
  },
  safety: {
    type: String,
    required: [true, "Safety is required"],
  },
  privateParkingDensity: {
    type: String,
    required: [true, "Private Parking Density is required"],
  },
  busLines: {
    type: String,
    // required: [true, "Bus Lines is required"],
  },
  ubahnLines: {
    name: {
      type: String,
      // required: [true, "ubahn Lines is required"],
    },
    image: {
      type: String,
      // required: [true, "ubahn Lines is required"],
    },
  },
  sbahnLines: {
    name: {
      type: String,
      // required: [true, "sbahn Lines is required"],
    },
    image: {
      type: String,
      // required: [true, "sbahn Lines is required"],
    },
  },
  bikesLanesDensity: {
    type: String,
    // required: [true, "Bikes Lanes Density is required"],
  },
  parkingStreetSlots: {
    type: String,
    // required: [true, "Parking Street Slots is required"],
  },

  lat: {
    type: Number,
    // required: [true, "Lat is required"],
  },

  lng: {
    type: Number,
    // required: [true, "Lng is required"],
  },

  photo: {
    type: String,
    // required: [true, "Photo is required"],
  }
});


neighborhoodSchema.plugin(uniqueValidator, {
  message: "{PATH} should be unique",
}); //---> Ejecutar unique validator

module.exports = mongoose.model("Neighborhood", neighborhoodSchema); //---> Exportamos hacia fuera el modelo que acabamos de crear.
