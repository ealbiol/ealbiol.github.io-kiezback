const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema

let neighborhoodPropertySchema = new Schema({

    district: {
        name: {
            type: String,
            unique: true, //---> Si el email ya existe saltará un error informando que este email ya existe.
            required: [true, "Neighborhood name is required"],
        }, //---> Si no ponemos required por defecto no lo será. El string después del true es el mensaje de error que aparecerá si el usuario no pone el username.

        image: {
            type: String,
            required: [true, "Neighborhood image is required"],
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
            required: [
                true,
                "Architecture Predominance image of Old Town is required",
            ],
        },
    },

    internationality: {
        type: String,
        required: [true, "Internationality is required"],
    },

    partyWinner: {
        name: {
            type: String,
            required: [true, "Party Winner Name is required"],
        },
        color: {
            type: String,
            required: [true, "Party Winner Color is required"],
        },
        image: {
            type: String,
            required: [true, "Party Winner Image is"],
        },
    },

    transportZone: {
        name: {
            type: String,
            required: [true, "Transport Zone Name is required"],
        },

        color: {
            type: String,
            required: [true, "Transport Zone Color is required"],
        },
    },

    activityRate: {
        name: {
            type: String,
            required: [true, "Activity Name Rate is required"],
        },

        image: {
            type: String,
            required: [true, "Activity Rate Image is required"],
        },
    },

    lifeCost: {
        name: {
            type: String,
            required: [true, "Life Cost is required"],
        },
        image: {
            type: String,
            required: [true, "Life Cost is required"],
        },
    },

    inhabitantsDensity: {
        name: {
            type: String,
            required: [true, "Inhabitants Density name is required"],
        },
        image: {
            type: String,
            required: [true, "Inhabitants Density Image is required"],
        },
    },

    citizenAverageAge: {
        name: {
            type: String,
            required: [true, "Citizen Average Age name is required"],
        },
        image: {
            type: String,
            required: [true, "Citizen Average Age Image is required"],
        },
    },

    gymDensity: {
        name: {
            type: String,
            required: [true, "Gym Density name is required"],
        },
        image: {
            type: String,
            required: [true, "Gym Density Image is required"],
        },
    },

    restaurantsDensity: {
        name: {
            type: String,
            required: [true, "Restaurants Density Name is required"],
        },
        image: {
            type: String,
            required: [true, "Restaurants Density Image is required"],
        },
    },

    supermarketsDensity: {
        name: {
            type: String,
            required: [true, "Supermarkets Density Name is required"],
        },
        image: {
            type: String,
            required: [true, "Supermarkets Density Image is required"],
        },
    },

    cinemas: {
        name: {
            type: String,
            required: [true, "Cinemas Name is required"],
        },
        image: {
            type: Number,
            required: [true, "Cinemas Image is required"],
        },
    },

    museums: {
        name: {
            type: String,
            required: [true, "Museums Name is required"],
        },
        image: {
            type: Number,
            required: [true, "Museums Image is required"],
        },
    },

    nightLife: {
        name: {
            type: String,
            required: [true, "Night Life Name is required"],
        },
        image: {
            type: String,
            required: [true, "Night Life Image is required"],
        },
    },

    airQuality: {
        name: {
            type: String,
            required: [true, "Air Quality Name is required"],
        },
        image: {
            type: String,
            required: [true, "Air Quality Image is required"],
        },
    },

    cleanness: {
        name: {
            type: String,
            required: [true, "Cleanness is required"],
        },
        image: {
            type: String,
            required: [true, "Cleanness is required"],
        },
    },

    greenAreasDensity: {
        name: {
            type: String,
            required: [true, "Green Areas Density is required"]
        },
    },
    noiseLevel: {
        name: {
            type: String,
            required: [true, "Noise Level Name is required"],
        },
        image: {
            type: String,
            required: [true, "Noise Level Image is required"],
        },
    },
    safety: {
        name: {
            type: String,
            required: [true, "Safety Name is required"],
        },
        image: {
            type: String,
            required: [true, "Safety Image is required"],
        },
    },
    privateParkingDensity: {
        name: {
            type: String,
            required: [true, "Private Parking Density Name is required"],
        },
        image: {
            type: String,
            required: [true, "Private Parking Density Image is required"],
        },
    },
    busLines: {
        type: String,
        required: [true, "Bus Lines is required"],
    },
    ubahnLines: {
        name: {
            type: String,
            required: [true, "ubahn Lines is required"],
        },
        image: {
            type: String,
            required: [true, "ubahn Lines is required"],
        },
    },
    sbahnLines: {
        name: {
            type: String,
            required: [true, "sbahn Lines is required"],
        },
        image: {
            type: String,
            required: [true, "sbahn Lines is required"],
        },
    },
    bikesLanesDensity: {
        type: String,
        required: [true, "Bikes Lanes Density is required"],
    },
    parkingStreetSlots: {
        type: String,
        required: [true, "Parking Street Slots is required"],
    },

    lat: {
        type: String,
        required: [true, "Lat Street Slots is required"],
    },

    lng: {
        type: String,
        required: [true, "Lng Street Slots is required"],
    }
});



neighborhoodPropertySchema.plugin(uniqueValidator, { message: "{PATH} should be unique" })

module.exports = mongoose.model("NeighborhoodProperty", neighborhoodPropertySchema); //Aquí se decide el nombre de la colección que aparecerá en MongoDB. MongoDB la pondrá en plural.