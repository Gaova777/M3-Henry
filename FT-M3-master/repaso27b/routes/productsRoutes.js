let express = require('express')
let router = express.Router(); //para generar rutas acá y no en mi archivo principal

let {addProduct, listProduct} = require('../models/productModels.js')


//quiero hacer una ruta, que agregue un elemento al arreglo productos, si el elemento no estaba incluido, que lo agregue y devuelva, caso contrario que arroje error 404

router.post('/', (req, res)=>{
    try {
        // let response= addProduct(req.params.name)
        // return res.status(200).send(response)

        //hagamoslo por body-->en el path si debe nada mas estar "/" pero si es por params agregamos los ":name"
        const {name}=req.body
        console.log('name', name)
        let response = addProduct(name);
        return res.status(200).send(response)

    } catch (e) {
        console.log(e)
        return res.status(400).send(e.toString())
    }
})

router.get('/',(req,res)=>{
    res.send(listProduct())
})

module.exports = router;