const express = require("express");
const ramda = require("ramda");
const router = express.Router();

const CoatOfArmsImage = require("../models/coatOfArmsImage");
const verifyToken = require("../middlewares/auth")
//http://localhost:3000/coatsofarmsimages/
//---> G E T
router.get("/", verifyToken, (req, res) => {
    CoatOfArmsImage.find({}).exec((error, coatofarmsimages) => {
        if (error) {
            res.status(400).json({ ok: false, error });
        } else {
            res.status(200).json({ ok: true, coatofarmsimages })
        }
    })
});


module.exports = router