// En config guardamos todas las VARIABLES DE ENTORNO:

// ---> Variable de entorno para el PUERTO
//PORT
process.env.PORT = process.env.PORT || 3000;                //---> En el servidor real se usará process.env.PORT. En localhost 3000.

const adminSecretKey = "A2gar4awdadaw";


module.exports = {
    adminSecretKey
};

















// Variables de entorno: Existen en windows, linux, etc.
// Son variables globales, disponibles desde cualquier punto, que existen en nuestro sistema operativo
// En node se acceden a traves de 'process.env'

// Para verlas en consola tecleamos: printenv
