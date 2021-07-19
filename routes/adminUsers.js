
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Neighborhood = require("../models/neighborhood"); //Del modelo neighborhood creará una nueva instancia si hacemos POST.
const adminToken = require("../middlewares/authAdmin"); //Importamos el adminToken

function getPartyWinnerURL(partyWinnerName) {
    let url = "";
    console.log("Party", partyWinnerName.toUpperCase())
    switch (partyWinnerName.toUpperCase()) {
        case "CDU":
            url = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cdu-logo.svg";
            break;
        case "LINKE":
            url = "https://upload.wikimedia.org/wikipedia/commons/4/45/Die_Linke_logo.svg";
            break;
        case "SPD":
            url = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Sozialdemokratische_Partei_Deutschlands%2C_Logo_um_2000.svg";
            break;
        case "AFD":
            url = "https://upload.wikimedia.org/wikipedia/commons/4/48/AfD-Logo-2017.svg";
            break;
        case "GRÜNE":
            url = "hhttps://upload.wikimedia.org/wikipedia/commons/5/51/B%C3%BCndnis_90_-_Die_Gr%C3%BCnen_Logo_%28transparent%29.svg";
            break;
        default:
            url = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cdu-logo.svg";
            break;

    }
    return url;

}
//---> P O S T
router.post("/", adminToken, (req, res) => { //Añadimos el adminToken
    let body = req.body;

    const neighborhood = new Neighborhood({ //Del modelo neighborhood creará una nueva instancia si hacemos POST.
        district: { name: body.neighborhoodDistrict?.toLoLowerCase() },
        name: body.neighborhoodName?.toLoLowerCase(),
        architecturePredominance: { name: body.neighborhoodArchitecture?.toLoLowerCase() },
        internationality: body.neighborhoodInternationality?.toLoLowerCase(),
        partyWinner: { name: body.neighborhoodPartyWinner?.toLoLowerCase(), image: getPartyWinnerURL(body.neighborhoodPartyWinner) },
        transportZone: { name: body.neighborhoodTransportZone?.toLoLowerCase() },
        activityRate: { name: body.neighborhoodActivityRate?.toLoLowerCase() },
        lifeCost: { name: body.neighborhoodLifeCost?.toLoLowerCase() },
        inhabitantsDensity: body.neighborhoodInhabitantsDensity?.toLoLowerCase(),
        citizenAverageAge: body.neighborhoodCitizenAverageAge?.toLoLowerCase(),
        gymDensity: body.neighborhoodGymDensity?.toLoLowerCase(),
        restaurantsDensity: { name: body.neighborhoodRestaurantsDensity?.toLoLowerCase() },
        supermarketsDensity: { name: body.neighborhoodsuperMarketsDensity?.toLoLowerCase() },
        cinemas: { name: parseInt(body.neighborhoodCinemas?.toLoLowerCase()) },
        museums: { name: parseInt(body.neighborhoodMuseums?.toLoLowerCase()) },
        nightLife: { name: body.neighborhoodNightLife?.toLoLowerCase() },
        airQuality: body.neighborhoodAirQuality?.toLoLowerCase(),
        cleanness: { name: body.neighborhoodCleanness?.toLoLowerCase() },
        greenAreasDensity: body.neighborhoodGreenAreasDensity?.toLoLowerCase(),
        noiseLevel: { name: body.neighborhoodNoiseLevel?.toLoLowerCase() },
        safety: body.neighborhoodSafety?.toLoLowerCase(),
        privateParkingDensity: body.neighborhoodPrivateParkingDensity?.toLoLowerCase(),
        busLines: body.neighborhoodBusLines?.toLoLowerCase(),
        ubahnLines: { name: body.neighborhoodUbahnLines?.toLoLowerCase() },
        sbahnLines: { name: body.neighborhoodSbahnLines?.toLoLowerCase() },
        // bikesLanesDensity: { name: body.neighborhoodBikesLanesDensity },
        // parkingStreetSlots: { name: body.neighborhoodParkingStreetSlots },
        lat: body.neighborhoodLat,
        lng: body.neighborhoodLng,
        photo: body.neighborhoodPhoto?.toLoLowerCase()
    });

    neighborhood.save((error, savedNeighborhood) => {
        if (error) {
            res.status(400).json({ ok: false, error });
        } else {
            res.status(201).json({ ok: true, savedNeighborhood });
        }
    });
});

router.put("/update-neighborhood", adminToken, (req, res) => { //Añadimos el adminToken
    let body = req.body;

    const neighborhood = new Neighborhood({ //Del modelo neighborhood creará una nueva instancia si hacemos POST.
        district: { name: body.neighborhoodDistrict },
        name: body.neighborhoodName,
        architecturePredominance: { name: body.neighborhoodArchitecture },
        internationality: body.neighborhoodInternationality,
        partyWinner: { name: body.neighborhoodPartyWinner, image: getPartyWinnerURL(body.neighborhoodPartyWinner) },
        transportZone: { name: body.neighborhoodTransportZone },
        activityRate: { name: body.neighborhoodActivityRate },
        lifeCost: { name: body.neighborhoodLifeCost },
        inhabitantsDensity: body.neighborhoodInhabitantsDensity,
        citizenAverageAge: body.neighborhoodCitizenAverageAge,
        gymDensity: body.neighborhoodGymDensity,
        restaurantsDensity: { name: body.neighborhoodRestaurantsDensity },
        supermarketsDensity: { name: body.neighborhoodsuperMarketsDensity },
        cinemas: { name: parseInt(body.neighborhoodCinemas) },
        museums: { name: parseInt(body.neighborhoodMuseums) },
        nightLife: { name: body.neighborhoodNightLife },
        airQuality: body.neighborhoodAirQuality,
        cleanness: { name: body.neighborhoodCleanness },
        greenAreasDensity: body.neighborhoodGreenAreasDensity,
        noiseLevel: { name: body.neighborhoodNoiseLevel },
        safety: body.neighborhoodSafety,
        privateParkingDensity: body.neighborhoodPrivateParkingDensity,
        busLines: body.neighborhoodBusLines,
        ubahnLines: { name: body.neighborhoodUbahnLines },
        sbahnLines: { name: body.neighborhoodSbahnLines },
        // bikesLanesDensity: { name: body.neighborhoodBikesLanesDensity },
        // parkingStreetSlots: { name: body.neighborhoodParkingStreetSlots },
        lat: body.neighborhoodLat,
        lng: body.neighborhoodLng,
        photo: body.neighborhoodPhoto
    });

    neighborhood.save((error, savedNeighborhood) => {
        if (error) {
            res.status(400).json({ ok: false, error });
        } else {
            res.status(201).json({ ok: true, savedNeighborhood });
        }
    });
});
//---> P U T (actualizar)
router.put("/:id", adminToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Neighborhood.findByIdAndUpdate(
        id,
        body,

        (error, updatedNeighborhood) => {
            if (error) {
                res.status(400).json({ ok: false, error });
            } else {
                res.status(200).json({ ok: true, updatedNeighborhood });
            }
        }
    );
});


//---> D E L E T E (desactivar, no borrar)
router.delete("/:id", adminToken, (req, res) => {
    const id = req.params.id;

    Neighborhood.findByIdAndUpdate(
        id,
        { active: false },
        (error, updatedNeighborhood) => {
            if (error) {
                res.status(400).json({ ok: false, error });
            } else if (!updatedNeighborhood) {
                res.status(400).json({ ok: false, error: "Neighborhood not found" });
            } else {
                res.status(200).json({ ok: true, updatedNeighborhood });
            }
        }
    );
});
module.exports = router