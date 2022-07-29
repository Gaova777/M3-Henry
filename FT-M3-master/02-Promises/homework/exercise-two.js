'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  // ???
  const one = promisifiedReadFile('poem-two/stanza-01.txt').then(st => {blue(st)})
  const two = promisifiedReadFile('poem-two/stanza-02.txt').then(st => {blue(st)})//esta es otra manera, cosa que me guardo en la variable una promesa 

  Promise.all([one,two])
  // .then(st => {
  //   blue(st[0])
  //   blue(st[1]) //voy a recibir la resolucion de ambos en un arreglo
  .then(()=>{
    console.log('done')
  })//con una forma más practica de hacerlo es mas divertido así
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  // ???
  // filenames =  ['poem-two/stanza-01.txt',  'poem-two/stanza-01.txt', .... ]

  const promises = filenames.map(file => promisifiedReadFile(file).then(st => {blue(st)})) //me quedará
  //["te prometo que consologeo el 1", "...el 2...",...]

  Promise.all(promises)
  .then(()=>{
    console.log('done')

  })
  
}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  // ???
  filenames.reduce((p, file) =>{
    return p.then((st) => { //p inicia como promesa falsa
      if(st) blue(st)//como en un principio no está, entonces este if es falso, por lo que procede al return, entonces dicho return me da el valor del acumulador, vuelve hace el ciclo y, como esta vez, p si tiene un valor que es el file, ya aplicandole el promisifiedReadFile, entonces podemos aplicarle el .then y por consiguiente entra al if y me hace el blue st. 
      return promisifiedReadFile(file)//el siguiente
    })
  }, Promise.resolve(false))
  //ahora terminar de hacer el ciclo p termina con el ultimo valor, que es una promesa, por lo que se puede hacer un .then
  .then((stanza) => {
    blue(stanza)
    console.log('done')
  })

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  // ???
  filenames.reduce((p, file) =>{
    return p.then((st) => { //p inicia como promesa falsa
      if(st) blue(st)//como en un principio no está, entonces este if es falso, por lo que procede al return, entonces dicho return me da el valor del acumulador, vuelve hace el ciclo y, como esta vez, p si tiene un valor que es el file, ya aplicandole el promisifiedReadFile, entonces podemos aplicarle el .then y por consiguiente entra al if y me hace el blue st. 
      return promisifiedReadFile(file)//el siguiente
    })
  }, Promise.resolve(false))
  //ahora terminar de hacer el ciclo p termina con el ultimo valor, que es una promesa, por lo que se puede hacer un .then
  .then((stanza) => {
    blue(stanza)
    console.log('done')
  })
  .catch(err => {
    magenta(new Error(err))
    console.log('done')
  })

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu código aquí
    return new Promise(function(resolve,reject){
      fs.writeFile(filename, string, err =>{
        if(err) return reject(err)
        resolve('Ta todo bien')
      })
    })
  }


 /*  utils.promisifiedReadFile = function (filename) {
    return new Promise(function (resolve, reject) {
      utils.readFile(filename, function (err, str) {
        if (err) reject(err);
        else resolve(str);
      });
    });
  }; */


}
