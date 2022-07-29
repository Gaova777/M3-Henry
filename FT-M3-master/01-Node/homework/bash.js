//     Output un prompt
//    process.stdout.write('prompt > ');//es un codigo como en pytho, que me va a escuchar  lo que escriba despues del prompt

//    y 

//    * El evento stdin 'data' se dispara cuando el user escribe una línea
//    process.stdin.on('data', function (data) { //el on, es como un eventlistener, escucha lo que escribi en la linea 2 en el process
//      var cmd = data.toString().trim(); // remueve la nueva línea o un espacio
//      process.stdout.write('You typed: ' + cmd);
//      process.stdout.write('\nprompt > ');
//    });

   // '      hola     '.trim() ----> 'hola'




   const commands = require('./commands');


   const done = function(output){
        process.stdout.write(output)
        process.stdout.write('\nprompt >')
   }//como repetimos tanto codigo, estas lineasitas me ayudaran refactorizar o mejjorar la eficiencia del codigo.

   // Output un prompt
   process.stdout.write('prompt > ');
   // El evento stdin 'data' se dispara cuando el user escribe una línea
   process.stdin.on('data', function (data) {
    var arg = data.toString().trim().split(' ')//acá estamos guardando en caso de que nos mande el comando echo, pues que guarde todo en un array  // remueve la nueva línea
     var cmd = arg.shift() 
     if(commands.hasOwnProperty(cmd)){
        commands[cmd](arg, done)//coloco lo que hay en el arreglo ademas le coloco la funcion para refactorizar las cosas
    }else{
        process.stdout.write('command not found')
    }
    // process.stdout.write('\nprompt > ');
    //  if(cmd === 'date') {
    //   * process.stdout.write(Date());  
    //    commands[cmd]()
    //  }
    //  if(cmd === 'pwd') {
    //    *acá deneos einvestigar en el objeto proces, existn dos maneras
    //    *process.cwd()--->me da el path de la ruta actual por el cuale stoy parado
       
       
    //    *process.stdout.write(process.cwd())


    //    commands[cmd]()
    //  }

    //otra manera mas simple de hacerlo es verificando si lo que tengo adentro es lo que el escribio el usuario con hasOwnProperty
   
   });