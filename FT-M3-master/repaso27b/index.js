// * configuraciones que necesito:

//traernos el expresito

const express = require('express')//en sumidas cuentas expres es una funcion debemos dar inicio a nuestro servidor llamando a esta funcion
 const server = express(); //la iniciamos
 const morgan = require('morgan') // un middleware que usaremos y es muuy util para mostrar en consola que se esta ejecutando 

 const users = require('./routes/users')//acá traemos el modularizado

 const productsRoutes = require('./routes/productsRoutes.js')// muy relevante, para realizar modelos y hacer logica, podemos usar este proceso, y dento del archivo productsRoutes exportamos los modelos de los cuales le aplicamos el trycatch

 const weatherRoutes = require('./routes/weather')


 server.use(morgan('tiny'))//el tipo tiny me va a mostrar :method :url :status :res[content-length] - :response-time ms 
//morgan de tiny se aplicara a todos los request

// TODO: (1) middleware de json de express
server.use(express.json())// che fijate que lo que te llegue traducilo a un json...// * es comunmnete usado para traer la información por body y la info se pasará en formato json, y esta info en ese formato no podrá ser leído, donde el middleware se encargará de transformarlo en objeto.

// ! importante: el orden de los middlewars es relevante

//acá traemos el modulizado una vez exportado y lo usamos
server.use('/users',users)//despues de haber creado el archivo modularizado que es donde estan las rutas en Router de express, ubicado en la carpeta router, el archivo llamado users me exporta todo lo que decidamos aplicar, gracias al server.use, todo lo que tenga en el path /users, va a ir a parar al archivo ruteado

/* cuando a vos te llegue rutas del tipo

/users/
/users/:name
/users/usuario/:name

lo que tengas con el prefijo users, lo vayas a buscar al archivo que designamos que causalmente se llama users

*/


server.use('/products', productsRoutes)//acá ya usamos en el path, cuando escribamos "/products/:name va a añadirse el producto y ademas se va a mostrar, este proceso gracias al models


// * hagamos un moddule con practica de apis

server.use('/weather', weatherRoutes)



// ! hagamonos un arreglo que sea nuestra base de datos

let names = [{id:1, name: 'Juan'}, {id:2, name: 'Diego'}, {id:3, name: 'Monica'}]
let id=4;


//un middleware es una función, donde podremos ahcer lo que queramos un middleware puede ser:

function logger(req, res, next){
    console.log(req.url)
    next()
}//este es un middelware donde muestra la url donde esta parada, y se puede ejecutar donde queramos


// ! muy importante
// herramientas como postman, me ayudan a visualizar el servidor que decidamos levantar
// !


/*server.METHOD(path, (req, res, next)=>{  
    // ? algo muy importante es que cuando tenemos un next, lo que sucede es delega a la siguiente peticion
    res.send()
})
*/
server.get('/',logger, (req, res, next)=>{ //acá vemos el ejemplo del middleware
    //res.type()
    // res.send('Bienvenidos')
    console.log('previo al next')
    next() //lo que hacemos con el next es delegar de forma ordenada a la siguiente peticion conisuigente a esta 
});

server.get('/', (req, res)=>{
    res.type('html')
    res.send('bienvenido a nuestro server luego del next')
});



server.get('/json', (req,res)=>{
    //content-Type: application/json-->
    // res.json({message: 'hola'})
    //res.json(undefined)
    //res.json(null)
    //algo particular es que a todo res.json su content type será application/json
    res.json('Esto e sun json en ruta /json')
})

server.get('/send', (req, res)=>{
    res.send(undefined)//acá vemos como su content-Type, es un error e igual con el null
    res.send(null)//el content-Type es un error, por lo que es una diferencia con el content-type de json

})

// quiero recibir por parametros un id, por query un name, por parametros también un apellido
//quiero ademas, responder que si el nombre no vino, responda un 404 "que el nombre no vino", y si el id es mayor a 5, responder un 404 "el id es mayor a 5" y sino, responder un string con todo concatenado


//ojo para los querys recordadd, miremos este caso

// *ahora para los querys en la url no se piden en el path, pero si al solicitarla, es decir añadiendo en la url el query que para este caso sería nombre---> /uno/algo/otracosa?nombre=Juan
server.get('/uno/:id/:apellido', (req, res)=>{

    let {id, apellido}= req.params
    let {nombre} = req.query;

    if(!nombre) return res.status(404).json({message: 'Falta información'}) //si solo queremos mandar el error --> res.sendStatus(404)
    console.log(typeof id) //esto me va a sacar que es un string
    //isNaN(Number(id)) acá miramos si es un numero lo que enviamos como id
    
    if(id>5) return res.status(404).send({message:'El id es mayor a 5'})// el return me da la solución de enviar una sola respuesta a la solicitud que se hace, ya que no se puede hacer multiples respuestas
    res.send(`${id} ${nombre} ${apellido}`)
}) //es importante recalcar que lo que vaya despues de los dos puntitos es obligatorio llamarlo como la variable a la que necesitamos requerir información, para hacer destructuring despues


// ! toda información que llegue por url será un string
    // req.params   --> {id, apellidos} un objeto me devuelve
    



server.post('/', (req, res)=>{
    console.log(req.body)
   // podríamos hacer algo con esta información traducida, por ejemplo aplicar destructuring

   let {id, title, contents} = req.body
   
   
    res.send(`el ${title} tiene un id(${id}) y su contenido es ${contents}`)//sin el middleware me sale un undefined, para eso se coloca arriba en (1)
})

server.post('/addName/:name', (req, res)=>{
    const {name}=req.params;
    const {location, age}=req.body;

    if(!location || !age || !name) return res.sendStatus(404)

    names.push({id: id++, name, location,age})
    res.json(names);
    //res.send(names)-->si se puede

});

// key=value&key1=value1&key2=value2... para el query
server.get('/search/:id', (req, res)=>{
    let id = req.params.id

    //let names = [{id:1, name: 'Juan'}, {id:2, name: 'Diego'}, {id:3, name: 'Monica'}]

    //filter ==> nuevo arreglo
    //find ==>devuelve el primer objeto que coincida
    //map=>nuevo arreglo
    let find=names.find(n=>n.id===parseInt(id)) //así cojo el objeto del que coincida el id por el que le pase por url y el parseInt me lo convierte en un int

    if(find) return res.send(find.name);
    res.sendStatus(404) //si lo encuentra me muestra el name, sinoo entoncesme muestra el status 404
})

//para ruta comodin

server.get('*',(req,res)=>{
    res.status(404).send('No existe ninguna ruta con dicha url')
})//esto es como un catch  



server.listen(3000, ()=>{console.log('listening on port 3000')})

//el script en el packa.json de ---> start: nodemon index.js me da la posibilidad de iniciarlo

//levantamos el servidor con el listen

// todo:----> glosario. una request: es un pedido por parte del cliente