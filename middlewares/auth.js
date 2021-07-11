const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;
    //token = token && token.split(" ")[1];



    jwt.verify(token, process.env.SEED, (error, playload) => {

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

module.exports = verifyToken;