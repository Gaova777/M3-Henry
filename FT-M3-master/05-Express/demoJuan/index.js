const { query } = require('express');
var express = require('express')
var app = express();

const getHtml = require('./routes/getHtml')

//-------------Middleware-------------------
app.use(function(req, res, next){
    console.log('Estoy en: ',req.url)
    //next() 
    //entonces acá hay algo y es que no tiene un path, al colocarlo así, este ejemplo de middleware va a funcionar para todos los paths, este es un ejemplo al activar next() para llamar la funcion en cada request solicitado y así actua como middleware
})

//app.use(morgan('dev'))

app.use(express.json()) //este es el middleware que me permite hacer la traduccion del body



//-----------------------metodos---------------------------
//--------------------get---------------
app.get('/', (req,res)=>{
    console.log('Estoy en /')
    res.send('estoy en /')// cuando se levante me mostrará esto 
})

// app.get('/html', (req, res)=>{
//     console.log('estoy en html')
//     res.send('<h1>Estoy en /html</h>')
// })
//podemos modularizar este codigo que esta comentado a algo mas cortito ruteandolo y trayendonos la funcion desde otro archivo

// app.use('\html', getHtml)


//-------------------------------------------
app.get('/obj', (req,res)=>{
    console.log('Estoy en obj')
    const obj = {nombre:'Fede', apellido:'gomez'}
    res.json(obj)//tambien se puede .send
})
app.get('status', (req,res)=>{
    console.log('Estoy en /status')
    res.sendStatus(404)
})
app.get('/msg/status', (req,res)=>{
    console.log('Estoy en /msg/status')
    res.status(400).json({msg: 'sorry bro' })//una genialidad que puedo setear el estatus coude y adicionalmente enviar algun tipo de información

})
app.get('/user/:name/:id',(req,res)=>{
    console.log('SOY PARAMS', req.params)//el params me señala este objetito que voy armando con las propiedades que hay despues de los dos puntos y si quiero acceder al name o al id, solo es cuestion de escribir su propiedad---> req.params.id para acceder al id
    res.json({user: req.params.name})//el params
    //res.send(req.params.name)
    
    //accedo con el :variable, a lo que escribieron en el lado del front-end

})
app.get('/user/saludar',(res, req)=>{
    console.log('Estoy en  /user/saludar')
    res.send('Holaaa usario!!')//algo muy caracteristico de express, es el orden, si bien el get anterior, tiene la caracterisitca que despues de "user/" siguen argumentos variables, por lo que es importante que si quiero una direccion con el user/ y necesito colocarle algo ene specifico como en este caso saludar, debo colocarlo primero, justo antes de donde este la direccion con la :name (argumento sensible o variable), o me hace lo que tiene el anterior direccion. el orden es clave en express

})
app.get('/query', (req, res)=>{
    console.log('SOY LAS QUERIES: ', req.query)
    res.send(query)
})//este codigo tiene req.query, que al acceder a estas, me ejecuta un objetito vacío, por loque si yo deseo añadir algo ahí, solo es cuestión de tener clave el "?" es decir en la barra de dirección ---> /query?nombre=Juan --> me va a colocar una propiedad o clave "nombre" con su valor "Juan" y podemos añadirle otra clave más con el "&"---> por eso en la tarea de peliculas podíamos acceder a las id de las peliculas ---> /imdb?s=idPeli&apiKey=12736 ahí vemos como se crea el objetito...y además podemos acceder a las propiedades que creamos simplemente con req.query.nombre para  este ejemplo.




//---------------------POST--------------------
//REQUEST(body)-------------->middleware(traduccion)---------------->ruta---->leer el body!
//el post es una forma de leer el body y mandarlo para que el navegador lo lea, pero solo puede leer el body (es un objeto), gracias a un traductor que sería el middleware, y así lo puede ejecutar en (1) vemos como llevarlo a cabo

app.post('/users', (req, res)=>{
    console.log('ESTOY EN EL BODY', req.body)
    const {name, lastname}=req.body
    res.send(`Usuario ${name} ${lastname} creado con exito`) //se podría visualizar en una aplicacion como "insomnia"
})
app.listen(3000)