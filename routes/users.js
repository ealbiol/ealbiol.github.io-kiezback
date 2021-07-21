


const express = require("express");
const ramda = require("ramda");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { adminSecretKey } = require("../config/config");
process.env.SEED = process.env.SEED || "MAWDKAWCKAWDM213c23";
const User = require("../models/user");

//---> G E T
router.get("/", (req, res) => {
  User.find({}).exec((error, users) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, users })
    }
  })
});

//---> P O S T REGISTER 
router.post("/register", (req, res) => {
  let body = req.body;

  console.log("BODY", body)
  const user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    active: true
  });
  console.log("BODY", user)
  user.save((error, savedUser) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(201).json({ ok: true, savedUser })
    }
  });


});




//---> POST LOGIN
router.post("/login", (req, res) => {
  let body = req.body;

  User.findOne({
    email: body.email.toLowerCase()
  }, (error, users) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else if (!users) {
      res.status(400).json({ ok: false })
    } else {
      bcrypt.compare(body.password, users.password, (err, check) => {
        if (err) {
          res.status(500).send({ ok: false, message: "Error de servidor." });
        } else if (!check) {
          res.status(404).send({ ok: false, message: "La contraseña no es correcta." });
        } else {
          const token = jwt.sign(
            { user: users },
            process.env.SEED,
            { expiresIn: 100000000 }
          );

          let adminToken = "";
          if (users.role === "ADMIN") {
            adminToken = jwt.sign(
              { user: users },

              adminSecretKey,
              { expiresIn: 100000000 }
            );
          }
          console.log(users.username)
          res.status(200).send({
            ok: true,
            status: "Ok. Login successful",
            token,
            adminToken,
            userName: users.username,
          });
        }
      })
    }
  })
});












//---> P U T 
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = ramda.pick(["username", "email"], req.body)

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (error, updatedUser) => {
      if (error) {
        res.status(400).json({ ok: false, error });
      } else {
        res.status(200).json({ ok: true, updatedUser })
      }
    }
  )
})


//---> D E L E T E (deactivate)                                          
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(
    id,
    { active: false },
    { new: true, runValidators: true, context: "query" },
    (error, updatedUser) => {
      if (error) {
        res.status(400).json({ ok: false, error });

      } else if (!updatedUser) {
        res.status(400).json({ ok: false, error: "User not found" });

      } else {
        res.status(200).json({ ok: true, updatedUser })
      }
    }
  );
});

module.exports = router




