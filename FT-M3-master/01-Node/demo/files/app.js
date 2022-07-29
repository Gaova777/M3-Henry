var fs = require('fs');
//modulo fs sirve para buscar archivos en mi compu, el five system, buscar leer archivos, escribir

var saludo = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(saludo);

/* bueno, acá, podemos ver una situación, cuando ejecutamos, lo que sucede es que se queda esperando lo que debe guardar en la variable, hasta que no resuelve no continua, por eso prosigue el console.log(saludo), de ahí pasa al console.log de la linea 21, ya que en la linea 14 lo que se ejecuta es un callback asincronico, a diferencia de la linea 4 el callback es sincronico y por eso espera  */



// var saludo = fs.readFileSync(__dirname + '/greet.txt');
// console.log('sin encoding:' + saludo); //sin encoding

fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
  if(err) return console.log(err);//(1) acá vemos como se hace true y salio el error por lo tanto me retorna el error consologeandolo
	console.log('data ', data);
});
//readFile es un metodo de fs, que claramente es, entonces vemos 3 argumentos, de la cual, en el primero vemos algo nuevo el __dirname es una forma de decir que ubicate en la misma carpeta, sino, podemos volar el dirname y solo colocar './greet.text' ese punto al principio significa lo mismo, el utf8 es el encodign, o codificacion para poder entenderlo o leerlo yo y por ultimo un callback

//ahora la funcion de callback tiene un debido proceso, err, es una variable de entrada que hace referencia al primer argumento del metodo readFile, si hubo error al hacer el proceso de leer dicho archivo sea cual sea el tipo de error, entonces entramos al if(1)... sino me muestra el console.log de los datos.....
console.log('Listo!');


//acá vemos como al crear el archivo se realiza esa lectura del greet.txt, y no me sale el error, entonces me lo codigica con utf8 y me consologuea los datos...el utf8 es muy importante o me sale un resultado inentendible....

//en el metodo readFile, el orden se debe de respetar

//