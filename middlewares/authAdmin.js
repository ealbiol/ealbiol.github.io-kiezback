const jwt = require("jsonwebtoken");
const { adminSecretKey } = require("../config/config");
const adminToken = (req, res, next) => {

    let token = req.headers.authorization;
    //token = token && token.split(" ")[1];


    jwt.verify(token, adminSecretKey, (error, playload) => {

        if (error) {
            res.status(401).json({
                ok: false,
                error
            })
        } else {
            next();
        }
    });

};

module.exports = adminToken;