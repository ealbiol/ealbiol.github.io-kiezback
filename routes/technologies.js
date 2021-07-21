const express = require("express");
const ramda = require("ramda");
const router = express.Router();

const Technology = require("../models/technology");
const verifyToken = require("../middlewares/auth")
//---> G E T
router.get("/", verifyToken, (req, res) => {
    Technology.find({}).exec((error, technologies) => {
        if (error) {
            res.status(400).json({ ok: false, error });
        } else {
            res.status(200).json({ ok: true, technologies })
        }
    })
});


module.exports = router