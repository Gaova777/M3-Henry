var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function(req, res){
  if(req.url==='/api'){
    res.writeHead(200, {'content-Type':'application/json'})
    return res.end(JSON.stringify(beatles))
  }
  if(req.url.substr(0,5)==='/api/'){//el substr es un metodo string, donde me cuenta cada caracter, ya que para este ejercicio si quiero un beatle en especifico en la direccion url, todos tienen en comun que su direccion se inicia con /api/--->
    //req.url ---> /api/John%20Lennon
    //req.url ---> /api/Paul%20McCartney
  //entonces podemos sacar los primeros [0,5] caracteres donde me indican, que el usuario solicita un beatle en especifico

    //el objetivo ahora es sacar /api/John%20Lennon y para poder obtener el nombre del artista, podemos separarlo con un split por barra split('/') para poder coger cada parte y convertirlos en un array
    //  /api/John%20Lennon.split('/') ---> ['api', 'John%20Lennon'] esto me va a ayudar a coger el ultimo valor que será guardado en una variable. así-->
    const beatle = req.url.split('/').pop() //este .pop me coge el ultimo valor, que es el que necesitamos.
    const found = beatles.find(b=>encodeURI(b.name)===beatle)//acá una vez que cogemos el valor en beatle, podemos cogerlo en el objeto principal, y lo guardamos en la variable found, entonces a el objeto beatle le aplicamos un find, que es un metodo que me coge todos los beatles y me devuelve el que cumpla la condicion que le aplicamos, en este caso el que se parezca a la variable beatle, ahora como no se parece el b.name con el beatle, le aplicamos un metodito, encodeURI a b.name que me convierte el nombre y le aplica el %20 que en la direccion es el reemplazo de los espacios, tambien existe el decodeURI, que me hace lo contrario, me cogería el nombre John%20Lennon y me le aplica el espacio

    if(found){
      res.writeHead(200, {'Content-Type':'application/json'})
      return res.end(JSON.stringify(found))

    }
    
    res.writeHead(404,{'Content-Type':'text/plain'})
    return res.end(`${decodeURI(beatle)} no es un beatle`)
  }

  if(req.url==='/'){
    fs.readFile('./index.html', function(err, data){
      if(err){
        res.writeHead(404,{'Content-Type':'text/plain'})
        return res.end(`sorry man`)
      }
      res.writeHead(200, {'Content-Type':'text/html'})
      return res.end(data)
    })
  }
  if(req.url.length > 1){//esta logica me indica que tiene algo mayor que "/" podemos hacer esto ya que los return de arriba me cortan la ejecucion de lo que se solicito con condiciones especificas.  

    const beatle = req.url.split('/').pop()
    const found = beatles.find(b=>encodeURI(b.name)===beatle)

    if(found){
      fs.readFile('./beatle.html','utf8', function(err, data){
        if(err){
          res.writeHead(404,{'Content-Type':'text/plain'})
          return res.end(`sorry man x2`) 
        }
        //reemplazar
        data = data.replace('{name}', found.name)
        data = data.replace('{birthdate}', found.birthdate)
        data = data.replace('{profilePic}', found.profilePic)

        res.writeHead(200, {'Content-Type':'text/html'})
        return res.end(data)
      })


    }else{
      res.writeHead(404,{'Content-Type':'text/plain'})
      return res.end(`sorry man x2`)  
    }

  }


}).listen(3000,'127.0.0.1')