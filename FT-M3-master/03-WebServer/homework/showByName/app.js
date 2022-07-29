var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
//vamos a rutear de la forma back para poder ir a por las imagenes
//---->req.url === /arcoiris_doge.jpg----> img---> /arcoiris_doge.jpg

http.createServer(function(req, res){//es mas facil concatenar el nombre del archivo mediante un codigo js dentro de lo que pide el ususario, para evitar sacar muchos ifs
    fs.readFile(`./images${req.url}.jpg`, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('img not found')
        }else{
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(data)
        }
    })
}).listen(3000, '127.0.0.1')