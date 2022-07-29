'use strict';
const express = require('express');
const morgan= require("morgan")
const indexRoutes = require("./routes/index")

const app = express();
app.use(morgan("dev"))
app.use(express.json());

// acuerdense de agregar su router o cualquier middleware que necesiten aca

/*
    1. Deberian traer las rutas de la carpeta routes.
    2. Fijense bien en la forma que se exporta el modulo routes/index.js, para poder traerlo y utilizarlo correctamente
*/
app.use("/", indexRoutes)

module.exports = app; // esto es solo para testear mas facil

