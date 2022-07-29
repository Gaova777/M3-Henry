// var hola = require('./hola.js');
//saludar();

var s = require('./saludos/');
//en s me traigo lo qu ehay en carpeta saludos, gracias a require, pero si no le especifico que archivo debo usar, automaticamente me trae index y al dirigirnos en el index.js ---> (mirar)

//mirar que despues, una vez exportadas las variables puedo usarlas de esta manera:

s.en()

var util = require('util'); //acá tenemos como una especie de importación, así mismo como el V8, me traigo el 'util' como si fuese una librería

// console.log(util.format('Hola, %s, como estas? %s', 'Toni', 'das'));//y esta librería se llama con el metodo dentro de la libreria '.format' y le aplico los argumentos que me solicita o decido colocar, no es relevante ahora pero el %s me trae el primer argumento Toni y el segundo me trae das