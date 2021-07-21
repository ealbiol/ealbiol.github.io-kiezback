

const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let neighborhoodSchema = new Schema({



  district: {
    name: {
      type: String,

      required: [true, "Neighborhood name is required"],
    },

    image: {
      type: String,

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

    },
    image: {
      type: String,

    },
  },

  transportZone: {
    name: {
      type: String,
      required: [true, "Transport Zone Name is required"],
    },

    color: {
      type: String,

    },
  },

  activityRate: {
    name: {
      type: String,
      required: [true, "Activity Name Rate is required"],
    },

    image: {
      type: String,

    },
  },

  lifeCost: {
    name: {
      type: String,
      required: [true, "Life Cost is required"],
    },
    image: {
      type: String,

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

    },
  },

  supermarketsDensity: {
    name: {
      type: String,
      required: [true, "Supermarkets Density Name is required"],
    },
    image: {
      type: String,

    },
  },

  cinemas: {
    name: {
      type: Number,
      required: [true, "Cinemas Name is required"],
    },
    image: {
      type: String,

    },
  },

  museums: {
    name: {
      type: Number,
      required: [true, "Museums Name is required"],
    },
    image: {
      type: String,

    },
  },

  nightLife: {
    name: {
      type: String,
      required: [true, "Night Life Name is required"],
    },
    image: {
      type: String,

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

  },
  ubahnLines: {
    name: {
      type: String,

    },
    image: {
      type: String,

    },
  },
  sbahnLines: {
    name: {
      type: String,

    },
    image: {
      type: String,

    },
  },
  bikesLanesDensity: {
    type: String,

  },
  parkingStreetSlots: {
    type: String,

  },

  lat: {
    type: Number,

  },

  lng: {
    type: Number,

  },

  photo: {
    type: String,

  },


  active: {
    type: Boolean,
    default: true,
  }


});


neighborhoodSchema.plugin(uniqueValidator, {
  message: "{PATH} should be unique",
});

module.exports = mongoose.model("Neighborhood", neighborhoodSchema);
