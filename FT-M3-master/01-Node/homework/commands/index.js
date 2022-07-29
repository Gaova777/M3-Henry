//vamos a usar fs y para eso lo exportamos de la manera backend

var fs = require('fs')
var request = require('request')

module.exports = {
    pwd: function(arg, done){
        done(process.cwd())
    },
    date: function(arg, done){
        done(Date());
    },
    ls: function(arg, done){
        fs.readdir('.', function(err, files) { //diferente del de ayer readdir un comando de fs para carpeta, el '.' es la misma ubicacion de donde esté, y le doy un callback de la cual me recibe el error si no encuentra la carpetita, y files. ya sabemos que hace sino encuentra la file, entra al if, forEach es usado en el array files, entonces a cada archivito le aplicara el process donde escribira el nombre y le hará un salto de linea para despues de hacer todo el recorrido volver al prompt
            if (err) throw err;
            var out=''
            files.forEach(function(file) {
              //process.stdout.write(file.toString() + "\n");
              
              out = out + file + '\n';
            })
           // process.stdout.write("prompt > ");
           done(out)
          });
    },
    echo: function(arg, done){
       // process.stdout.write(arg.join(' '))//ojo el arg solito es un arreglo, por eso le colocamos el join(' ')
       done(arg.join(' '))
    },
    cat: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;//interesante, mirad que acá traemos todo el file, que escribamos por argumento en cat, por loque coge el file[0] el primer valor o archivo, lo codificamos y le aplicamos el callback, aparecerá error sino encontramos algo, y data, se escribirá con el process:
            // process.stdout.write(data)
            // process.stdout.write('\nprompt >')
            done(data)
        })
    },
    head: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines=data.split('\n').slice(0,10).join('\n')//el head es sacar las primeras lineas de codigo de algun archivo entonces, cogemos los datos del archivo y el separador de los datos será un salto de linea, y el slice me trae desde el 0 hasta 10 linea junto con el join
            // process.stdout.write(lines)
            // process.stdout.write('\nprompt >')
            done(lines)
        })
    },
    tail: function(file, done){
        fs.readFile(file[0], 'utf8', function(err, data){
            if(err) throw err;
            const lines=data.split('\n').slice(-10).join('\n')//el head es sacar las primeras lineas de codigo de algun archivo entonces, cogemos los datos del archivo y el separador de los datos será un salto de linea, y el slice me trae con los -10 ultimas lineas junto con el join
            // process.stdout.write(lines)
            // process.stdout.write('\nprompt >')
            done(lines)
        })

    },
    curl: function(url, done){
        request(url[0], function(err, response, body){
            if(err) throw err;
            // process.stdout.write(body)
            // process.stdout.write('\nprompt >')
            done(body)
        })
    }
}