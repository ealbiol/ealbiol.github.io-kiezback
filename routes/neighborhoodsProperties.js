const express = require("express");
// const ramda = require("ramda");
const router = express.Router();
const adminToken = require("../middlewares/authAdmin"); //Importamos el adminToken


const NeighborhoodProperty = require("../models/neighborhoodProperty");
//---> G E T
router.get("/", (req, res) => {
    NeighborhoodProperty.findOne({}).exec((error, neighborhoodsProperties) => {
        if (error) {
            res.status(400).json({ ok: false, error });
        } else {
            res.status(200).json({ ok: true, neighborhoodsProperties })
        }
    })
});


module.exports = router

// router.get("/", adminToken, (req, res) => {
//Si añado adminToken no aparecen los datos renderizados. Preguntar a Daniel.