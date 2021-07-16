// En Route crearemos archivos js uno para cada familia de endpoints:
// Por ejemplo para todos los endpoints de /users (/users/loquesea, etc) los guardamos en este archivo. En otro de compras guardamos todos los endpoints de compras.


const express = require("express");                                     //---> Importamos express.
const ramda = require("ramda");                                         //---> Importamos ramda.
const router = express.Router();                                        //---> Traemos el componente Router que está dentro de express.
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { adminSecretKey } = require("../config/config");
process.env.SEED = process.env.SEED || "MAWDKAWCKAWDM213c23";
// IMportado el schema
const User = require("../models/user");                                 //---> Importamos el modelo/Schema de user.

//---> G E T
// C ----------> S ------------> BBDD  -----> S ------> C
router.get("/", (req, res) => {                                         //---> Hemos sustituido app por router.
  User.find({}).exec((error, users) => {                              //---> Similar al find de Mongo. Si el filtro está vacío me devuelve todos los documentos de la colección. Nos dará todos los usuarios ya que hemos puesto {} vacío. Primero mira si hay algun error y sino nos da users. Si por ejemplo quisieramos que solo nos devolviera los administradores tendríamos que poner .find({role: "ADMIN"})
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(200).json({ ok: true, users })
    }
  })
});

// /users/register
//---> P O S T REGISTER 
router.post("/register", (req, res) => {                               //---> Endpoint de los nuevos registros. Donde irán los datos del nuevo registro.
  //"/register" es el endpoint y el nombre de la operación con método POST.
  let body = req.body;

  console.log("BODY", body)
  const user = new User({                                             //---> Replicamos el schema diciendole que cada propiedad valdrá lo que este dentro de si misma (recordando poner body.) ---> username: body.username
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    active: true
  });
  console.log("BODY", user)
  user.save((error, savedUser) => {                                   //---> Se guarda user y ahora si se sube a MongoDB.
    if (error) {
      res.status(400).json({ ok: false, error });                   //---> Si hay algun error salta el error y sino nos devuelve el usuario guardado.
    } else {
      res.status(201).json({ ok: true, savedUser })
    }
  });


});


// function singUp(req, res) {
//   const user = new User();
//   const { name, lastName, email, password, repeatPassword } = req.body;
//   console.log(lastName);

//   user.name = name;
//   user.lastname = lastName;
//   user.email = email.toLowerCase();
//   //Default values
//   user.role = "admin";
//   user.active = false;

//   if (!password || !repeatPassword) {
//     res.status(404).send({ message: "Las contraseñas son obligatorias" });
//   } else {
//     if (password !== repeatPassword) {
//       res.status(404).send({ message: "Las contraseñas no son iguales" });
//     } else {
//       // encryp password
//       bcrypt.hash(password, null, null, function (err, hash) {
//         if (err) {
//           res
//             .status(500)
//             .send({ message: "Error al encriptar la contraseña." });
//         } else {
//           user.password = hash;
//           user.save((err, userStored) => {
//             if (err) {
//               res.status(500).send({ message: "El usuario ya existe" });
//             } else {
//               if (!userStored) {
//                 res.status(404).send({ message: "Error al crear usuario." });
//               } else {
//                 res.status(200).send({ user: userStored });
//               }
//             }
//           });
//         }
//       });
//       //res.status(200).send({ message: "Usuario creado" });
//     }
//     console.log("Continuar");
//   }
//   console.log("Endpoint de singUp");
// }


// function singIn(req, res) {
//   const params = req.body;
//   const email = params.email.toLowerCase();
//   const password = params.password;
//   // Find by email in mongo database
//   User.findOne({ email }, (err, userStored) => {
//     if (err) {
//       res.status(500).send({ message: "Error del servidor." });
//     } else if (!userStored) {
//       res.status(404).send({ message: "Email no encontrado." });
//     } else {
//       // Check password
//       bcrypt.compare(password, userStored.password, (err, check) => {
//         if (err) {
//           res.status(500).send({ message: "Error de servidor." });
//         } else if (!check) {
//           res.status(404).send({ message: "La contraseña no es correcta." });
//         } else {
//           res.status(200).send({
//             status: "ok"
//           });
//         }
//       });
//     }
//   });
//   console.log(params);
// }

//---> POST LOGIN
// /users/login
router.post("/login", (req, res) => {
  let body = req.body;

  // Find by email in mongo database
  User.findOne({
    email: body.email.toLowerCase()
  }, (error, users) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else if (!users) {
      res.status(400).json({ ok: false })
    } else {
      // Check password
      bcrypt.compare(body.password, users.password, (err, check) => {
        if (err) {
          res.status(500).send({ ok: false, message: "Error de servidor." });
        } else if (!check) {
          res.status(404).send({ ok: false, message: "La contraseña no es correcta." });
        } else {
          //Generación del Token
          const token = jwt.sign(
            { user: users }, // payload
            process.env.SEED,
            { expiresIn: 100000000 }
          );

          //Generamos el admin token
          let adminToken = "";
          if (users.role === "ADMIN") {
            adminToken = jwt.sign(
              { user: users }, // payload

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


/*
LOGIN:
1. Hacemos un post.
2. Creamos parámetro /login.
3. User.findOne() para buscar usuario registrado en BD.
4. Buscamos por email.
5. Check Password: Comparar la contraseña que llega desencriptada con la encriptada. Chequea que la contraseña no
encriptada que llega este asociada con su encriptado.

6. npm install jsonwebtoken
7. Token: Crear token cuando se logea. Añadirlo previo a la respuesta para que esta se envie con el token dentro.

*/









//---> P U T (actualizar)
router.put("/:id", (req, res) => {                                              //---> Actualizaremos el usuario a través del parámetro id.
  const id = req.params.id;                                                   //---> Inicializamos la variable id que tendra dentro el parámetro id.
  const body = ramda.pick(["username", "email"], req.body)                                               //---> Coger lo que se está enviando, el body.

  User.findByIdAndUpdate(                                                     //---> La colección en la que queremos modificar un documento. Añadimos método pick de ramda y las propiedades que queremos actualizar.
    id,
    body,
    { new: true, runValidators: true, context: "query" },                   //---> new:true --> Que nos devuelva el usuario actualizado. runValidators: Si no lo ponemos no se aplica el tipado del Schema se podría crear un usuario sin normas de tipado.                                                        
    (error, updatedUser) => {
      if (error) {
        res.status(400).json({ ok: false, error });
      } else {
        res.status(200).json({ ok: true, updatedUser })                   //---> Si va todo bien devolvemos el usuario actualizado.
      }
    }
  )
})


//---> D E L E T E (desactivar, no borrar)                                          //---> Aqui eliminamos de verdad pero en vez de realmente borrar, cambiaremos el estado del objeto de 'active' a 'inactive'. Está así en el siguiente delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(                                                         //---> La colección en la que queremos modificar un documento. Añadimos método pick de ramda y las propiedades que queremos actualizar.
    id,
    { active: false },
    { new: true, runValidators: true, context: "query" },                                     //---> new:true --> Que nos devuelva el usuario actualizado. runValidators: Si no lo ponemos no se aplica el tipado del Schema se podría crear un usuario sin normas de tipado.                                                        
    (error, updatedUser) => {
      if (error) {
        res.status(400).json({ ok: false, error });

      } else if (!updatedUser) {
        res.status(400).json({ ok: false, error: "User not found" });                       //---> Si va todo bien devolvemos el usuario actualizado.

      } else {
        res.status(200).json({ ok: true, updatedUser })
      }
    }
  );
});

module.exports = router                                                 //---> Exportamos este archivo para poder luego importarlo desde otro stio: Todos los archivos router serán ejecutados por server.js pero sacandolos de ahí conseguimos tenerlo todo más ordenado.






// //---> D E L E T E                                                           //---> Aqui eliminamos de verdad pero en vez de realmente borrar, cambiaremos el estado del objeto de 'active' a 'inactive'. Está así en el siguiente delete
// router.delete("/:id", (req, res) =>{
//     const id = req.params.id;

//     User.findByIdAndRemove(id, (error, removedUser) => {
//         if(error) {
//             res.status(400).json({ok: false, error});
//         } else {
//             res.status(200).json({ok: true, removedUser})                    //---> Si va todo bien devolvemos el usuario actualizado.
//         }
//     })
// })
