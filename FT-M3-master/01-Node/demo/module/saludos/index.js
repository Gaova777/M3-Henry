var saludoEn = require('./en.js');//me guarda en la variable lo que hay o se ejectuta en el archivo qu eme traigo, como en este caso en.js (mirar)
var saludoEs = require('./es.js');//acá encontramos otra forma de exportar para despues guardarlo en la variable


module.exports = {
  en : saludoEn,
  es : saludoEs
}//y en este objetito guardamos las variables con sus funciones exportadas, y a su vez se exporta a app.js
