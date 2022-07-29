var fs = require('fs');



var promise = new Promise(function(resolve, reject) {//acá vemos la forma en como se declara una promesa como si fuera un instancia, que me recibe un solo parametro, una funcion, resuelto y reject.


  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
    if (err) {
      return reject(Error("Algo se rompió"));//una vez leido el archivo que sucede, si nos tira error, es decir si no encuentra el archivo o alguna falla, accedemos a rejectar la promesa, y le ponemos la razón de la promesa que es lo qu ehay dentro de Error
    }
    //console.log(data);    
    resolve(data);//por el contrario si hay todo succesffull entonces todo se resuelve
  }); 
});

var nuevaDataPromesa = promise.then(function(data) {
  var nuevaData = data.split('').splice(0, 100).join('');
  return nuevaData;
})

console.log(promise);

promise.then(function(data) {
  console.log('se cumplió la promesa');
})


var lectura;
fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
  lectura = data;
}); 

console.log(lectura);





   dataBase.verifyUser(username, password, (error, userInfo) => {
       if (error) {
           callback(error)
       }else{
           dataBase.getRoles(username, (error, roles) => {
               if (error){
                   callback(error)
               }else {
                   dataBase.logAccess(username, (error) => {
                       if (error){
                           callback(error);
                       }else{
                           callback(null, userInfo, roles);
                       }
                   })
               }
           })
       }
   })

//muy importante el .then() conlleva dos argumentos, y los dos son modificadores

//.then(succesfullhandler, errorHandler)--->son manejadordelexito, manejador del error

//el .then para este caso

/* 
fetch(url....)
.then(res=>
  {console.log(res)}, err => {
    console.log(err)
  })//el .then en este caso se esta realizando en handle exitoso, es decir solo si se ejecuta exitosamente el fetch, me hace ese callback como en los anteriores ejemplos, y si se recahaza o no se resuelve, el err es el que se va a ejecutar y no el anterior, es decir si el status de la promise es fullfill pues se ejecutara el primer callback sino el segundo callback


  el .catch es la forma de introducir el error en caso de que la promesa no se lleve a cabo

*/