// SCHEMA DE LA COLECCIÓN users
//Guardamos cada colección en la carpeta models. Significa la representación de una entidad en la base de datos. Ejemplo: productos, usuarios, etc

//Schema de la colección 'users' que tenemos en MongoDB.
//Otros ejemplos de esquemas: productos, coches, etc

//En Schema decidimos el tipado de la colección correspondiente.


const mongoose = require("mongoose");                           //---> Importamos mongoose.

//const uniqueValidator = require("mongoose-unique-validator")    //---> Importamos mongoose-unique-validator. Nos sirve para que el mensaje de error de unique sea más entendible. Nada más.

let Schema = mongoose.Schema                                    //---> Creamos un Schema (está guardado en mongoose, es la herramienta que nos da mongoose para crear schemas)


const validRoles = {
    values: ["ADMIN", "USER"],                                 //---> roles de acceso con más o menos privilegios de acceso.
    message: "{VALUE} is not a valid role."                     //---> Mensaje que aparecerá si el rol que mete el cliente no existe.
}

let userSchema = new Schema({                                   //---> Creamos el Schema para la colección users.
    //---> Dentro del Schema ponemos todas las propiedades que tendrá está entidad/colección (user). 


    email: {
        type: String,
        unique: true, //changed
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"]                        //---> Si no ponemos required por defecto no lo será. El string después del true es el mensaje de error que aparecerá si el usuario no pone el username.
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        default: "USER",                                    //---> Tipo de rol. Admin, user, etc
        enum: validRoles                                    //---> Así sabe los roles validos que hemos definido en la variable validRoles más arriba.
    },

    active: {                                               //---> usuario desactivado pero no eliminado. active: true o active: false A efectos practicos parece como eliminado pero solo lo tenemos desactivado. Es una buena práctiva ya que borrar es muy destructivo.
        type: Boolean,
        default: true
    }
});


//Función para que oculta un campo al usuario cuando se transforma a JSON (ejemplo: contraseña, __v)
userSchema.methods.toJSON = function () {                                                           //---> función que devuelve todos los campos guardados en formato JSON.
    const user = this;                                                                            //---> Evitamos solo que se devuelva el password al cliente. Por lo que dará los otros campos como username, email etc pero no mostrará la constraseña.

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};
//


//userSchema.plugin(uniqueValidator, { message: "{PATH} should be unique" })                         
//---> Ejecutar unique validator

module.exports = mongoose.model("User", userSchema);                                              //---> Exportamos hacia fuera el modelo que acabamos de crear.