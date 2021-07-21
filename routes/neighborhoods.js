const express = require("express");
const ramda = require("ramda");
const router = express.Router();

const Neighborhood = require("../models/neighborhood");

const verifyToken = require("../middlewares/auth")








//---> G E T
router.get("/", verifyToken, (req, res) => {
  Neighborhood.find({ active: true }).exec((error, neighborhoods) => {
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
    active: true

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









//---> P U T
router.put("/deactivate", verifyToken, (req, res) => {

  const { NeighborhoodDelete } = req.body;
  let result = "";
  if (NeighborhoodDelete.length > 0) {

    NeighborhoodDelete.forEach((neighborhood) => {
      console.log("Barrio a borrar", neighborhood)
      Neighborhood.findOneAndUpdate({ name: neighborhood }, { active: false }, (err, elementUpdated) => {
        if (err) {
          result += " " + err;
        } else {
          result += " " + elementUpdated;
        }
      })


    })
  }
  res.status(200).json({ ok: true, result });


});


module.exports = router;
