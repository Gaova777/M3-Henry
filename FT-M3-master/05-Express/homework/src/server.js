let nextId =1;
// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// const posts = [];
let posts = []; //debemos cambiar el posts a un let para poder que se pueda cambiar

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json()); //  el middle ware para traducir el json
server.post('/posts', (req, res)=>{
    const { author, title, contents } = req.body

    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }//es necesario el return para que me corte la ejecucion

    const newPost ={
        id: nextId,
        author,
        title,
        contents
    }
    posts.push(newPost)
    nextId++
    res.json(newPost)
})
server.post('/posts/author/:author', (req, res)=>{
    const { title, contents } = req.body
    const { author }= req.params

    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }//es necesario el return para que me corte la ejecucion

    const newPost ={
        id: nextId,
        author,
        title,
        contents
    }
    posts.push(newPost)
    nextId++
    res.json(newPost)
})
// /posts?term=de---> req.query ---> {term: de}
// posts = [{id:1, title: hola, contents, fede}, ...]
// entocnces al final me va a pasa // ? --> const term = 'de'

server.get('/posts', (req, res)=>{
    const { term } = req.query
    if(term){
        const filtrados = posts.filter(p => p.title.includes(term) || p.contents.includes(term))
        return res.json(filtrados)
    }
    res.json(posts)
})

// /posts?term=blablabla y si quisiera tener otro recordad el "&"


// posts/fede
server.get('/posts/:author', (req,res)=>{
    const { author } = req.params; //cuando coloquen el nombre en el path -->/posts/juan en el params se guarda ese nombre y lo guardaremos en author

    const filtrados = posts.filter(p => p.author === author)

    if(filtrados.length === 0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
    res.json(filtrados)
})

server.get('/posts/:author/:title', (req,res)=>{
    const { author, title } = req.params; //cuando coloquen el nombre en el path -->/posts/juan en el params se guarda ese nombre y lo guardaremos en author

    const filtrados = posts.filter(p => p.author === author && p.title ===title)

    if(filtrados.length === 0){
        return res.status(STATUS_USER_ERROR).json( {error: "No existe ningun post con dicho titulo y autor indicado"})
    }
    res.json(filtrados)
})

server.put('/posts', (req, res)=>{
    const { id, title, contents } = req.body;

    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const post = posts.find(p => p.id === id) 
    if(!post){
        return res.status(STATUS_USER_ERROR).json({error: "No se encontro el post"})
    }
    //acá viene el para que el put.
    post.title = title //estamos cambiando, el title del posts original ya que los valores guardados en post son los mismos que en posts porque son dados es por referencia, entonces a la variable que dice title, asignarle el valor title entregado por body
    post.contents = contents

    res.json(post)
})

server.delete('/posts', (req, res)=>{
    const {id} = req.body

    if(!id){
        return res.status(STATUS_USER_ERROR).json( {error: "No hay id maestro"})
    }
    const post =  posts.find(p=> p.id === id)//aca tendremos el post que matcheo el find o undefined
    if(!post){
        return res.status(STATUS_USER_ERROR).json( {error: "No se"})
    }
    posts = posts.filter(p => p.id !== id)
    res.json({success: true})

})
server.delete('/author',(req, res)=>{
    const {author}= req.body

    if(!author){
        return res.status(STATUS_USER_ERROR).json( {error: "No hay autor maestro"})
    }
    const postAuthor = posts.filter(p=>p.author === author)
    
    if(postAuthor.length ===0){
        return res.status(STATUS_USER_ERROR).json( {error: "No existe el autor indicado"})
    }
    posts = posts.filter(p=>p.author !== author)
    
    res.json(postAuthor)
})

// TODO: your code to handle requests


module.exports = { posts, server };
