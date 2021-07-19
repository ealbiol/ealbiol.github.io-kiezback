
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Neighborhood = require("../models/neighborhood"); //Del modelo neighborhood creará una nueva instancia si hacemos POST.
const adminToken = require("../middlewares/authAdmin"); //Importamos el adminToken

//Background Image PartyWinnerURL
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
            url = "https://upload.wikimedia.org/wikipedia/commons/5/51/B%C3%BCndnis_90_-_Die_Gr%C3%BCnen_Logo_%28transparent%29.svg";
            break;
        default:
            url = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cdu-logo.svg";
            break;

    }
    return url;

}


//Background Image District Coat
function getDistrictURL(DistrictCoat) {
    let url = "";
    console.log("District", DistrictCoat.toUpperCase())
    switch (DistrictCoat.toUpperCase()) {
        case "CHARLOTTENBURG-WILMERSDORF":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Coat_of_arms_of_Charlottenburg-Wilmersdorf.svg/800px-Coat_of_arms_of_Charlottenburg-Wilmersdorf.svg.png";
            break;
        case "FRIEDRICHSHAIN-KREUZBERG":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Coat_of_arms_of_borough_Friedrichshain-Kreuzberg.svg/800px-Coat_of_arms_of_borough_Friedrichshain-Kreuzberg.svg.png";
            break;
        case "LICHTENBERG":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Coat_of_arms_of_borough_Lichtenberg.svg/800px-Coat_of_arms_of_borough_Lichtenberg.svg.png";
            break;
        case "MARZAHN-HELLERSDORF":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Coat_of_arms_of_borough_Marzahn-Hellersdorf.svg/800px-Coat_of_arms_of_borough_Marzahn-Hellersdorf.svg.png";
            break;
        case "MITTE":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Coat_of_arms_of_borough_Mitte.svg/800px-Coat_of_arms_of_borough_Mitte.svg.png";
            break;
        case "NEUKÖLLN":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Coat_of_arms_of_borough_Neukoelln.svg/800px-Coat_of_arms_of_borough_Neukoelln.svg.png";
            break;
        case "PANKOW":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Coat_of_arms_of_borough_Pankow.svg/800px-Coat_of_arms_of_borough_Pankow.svg.png";
            break;
        case "REINICKENDORF":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Coat_of_arms_of_borough_Reinickendorf.svg/800px-Coat_of_arms_of_borough_Reinickendorf.svg.png";
            break;
        case "SPANDAU":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Coat_of_arms_of_borough_Spandau.svg/800px-Coat_of_arms_of_borough_Spandau.svg.png";
            break;
        case "STEGLITZ-ZEHLENDORF":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Coat_of_arms_of_borough_Steglitz-Zehlendorf.svg/800px-Coat_of_arms_of_borough_Steglitz-Zehlendorf.svg.png";
            break;
        case "TEMPELHOF-SCHÖNEBERG":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Coat_of_arms_of_borough_Tempelhof-Schoeneberg.svg/800px-Coat_of_arms_of_borough_Tempelhof-Schoeneberg.svg.png";
            break;
        case "TREPTOW-KÖPENICK":
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Coat_of_arms_of_borough_Friedrichshain-Kreuzberg.svg/800px-Coat_of_arms_of_borough_Friedrichshain-Kreuzberg.svg.png";
            break;
        default:
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Coat_of_arms_of_borough_Treptow-Koepenick.svg/800px-Coat_of_arms_of_borough_Treptow-Koepenick.svg.png";
            break;

    }
    return url;

}



//Background Image Architecture
function getArchitecture(ArchitectureImage) {
    let url = "";
    console.log("Architecture", ArchitectureImage.toUpperCase())
    switch (ArchitectureImage.toUpperCase()) {
        case "HISTORIC":
            url = "https://images.unsplash.com/photo-1518374378163-27d6bd948263?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
            break;

        default:
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Coat_of_arms_of_borough_Treptow-Koepenick.svg/800px-Coat_of_arms_of_borough_Treptow-Koepenick.svg.png";
            break;

    }
    return url;

}





//---> P O S T
router.post("/", adminToken, (req, res) => { //Añadimos el adminToken
    let body = req.body;

    const neighborhood = new Neighborhood({ //Del modelo neighborhood creará una nueva instancia si hacemos POST.
        district: { name: body.neighborhoodDistrict?.toLowerCase(), image: getDistrictURL(body.neighborhoodDistrict) },
        name: body.neighborhoodName?.toLowerCase(),
        architecturePredominance: { name: body.neighborhoodArchitecture?.toLowerCase(), image: getArchitecture(body.neighborhoodArchitecture) },
        internationality: body.neighborhoodInternationality?.toLowerCase(),
        partyWinner: { name: body.neighborhoodPartyWinner?.toLowerCase(), image: getPartyWinnerURL(body.neighborhoodPartyWinner) },
        transportZone: { name: body.neighborhoodTransportZone?.toLowerCase() },
        activityRate: { name: body.neighborhoodActivityRate?.toLowerCase() },
        lifeCost: { name: body.neighborhoodLifeCost?.toLowerCase() },
        inhabitantsDensity: body.neighborhoodInhabitantsDensity?.toLowerCase(),
        citizenAverageAge: body.neighborhoodCitizenAverageAge?.toLowerCase(),
        gymDensity: body.neighborhoodGymDensity?.toLowerCase(),
        restaurantsDensity: { name: body.neighborhoodRestaurantsDensity?.toLowerCase() },
        supermarketsDensity: { name: body.neighborhoodsuperMarketsDensity?.toLowerCase() },
        cinemas: { name: parseInt(body.neighborhoodCinemas?.toLowerCase()) },
        museums: { name: parseInt(body.neighborhoodMuseums?.toLowerCase()) },
        nightLife: { name: body.neighborhoodNightLife?.toLowerCase() },
        airQuality: body.neighborhoodAirQuality?.toLowerCase(),
        cleanness: { name: body.neighborhoodCleanness?.toLowerCase() },
        greenAreasDensity: body.neighborhoodGreenAreasDensity?.toLowerCase(),
        noiseLevel: { name: body.neighborhoodNoiseLevel?.toLowerCase() },
        safety: body.neighborhoodSafety?.toLowerCase(),
        privateParkingDensity: body.neighborhoodPrivateParkingDensity?.toLowerCase(),
        busLines: body.neighborhoodBusLines?.toLowerCase(),
        ubahnLines: { name: body.neighborhoodUbahnLines?.toLowerCase() },
        sbahnLines: { name: body.neighborhoodSbahnLines?.toLowerCase() },
        // bikesLanesDensity: { name: body.neighborhoodBikesLanesDensity },
        // parkingStreetSlots: { name: body.neighborhoodParkingStreetSlots },
        lat: body.neighborhoodLat,
        lng: body.neighborhoodLng,
        photo: body.neighborhoodPhoto?.toLowerCase()
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

    const neighborhood = new Neighborhood({
        district: { name: body.neighborhoodDistrict, image: getDistrictURL(body.neighborhoodDistrict) },
        name: body.neighborhoodName,
        architecturePredominance: { name: body.neighborhoodArchitecture, image: getArchitecture(body.neighborhoodArchitecture) },
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