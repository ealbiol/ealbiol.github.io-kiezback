const express = require("express");
const router = express.Router();
const adminToken = require("../middlewares/authAdmin");


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

