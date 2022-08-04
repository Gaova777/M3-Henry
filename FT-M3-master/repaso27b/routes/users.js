//traigmaos
const express = require('express');
const router = express.Router(); //esto es para poder routear

// * si quiero definir una ruta "/user" y todas las rutas que sean /users vengan a parar acá

// si quiero entonces definir /user/ ->

router.get('/', (req, res)=>{
    res.send('Estoy parado en user')
})
router.get('/:nombre',(req,res)=>{
    res.send(`${req.params.nombre} de /users/:name`)
})


// * para acceder desde index a lo que yo defina acá se hace:
module.exports =  router;

/* Modularizar se da en estos pasos
1) creo archivo
2) requiero express e invoco a Router()
3) module.exports = router;
4) me falta decirle a traves de que rutas quiero que llegue acá

    /users/
    /users/:name
    /users/usuario/:name
la primer porcioon donde todos serán iguales, me denota este modulo en especifico

y eso lo defino en el MAIN FILE con
el server.use('/users', users) nombre del archivo
    */