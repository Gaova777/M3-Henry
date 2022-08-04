const express = require('express');
const router = express.Router()
const axios = require('axios')




const apiKey ="fd28c711faae4a9eb3c8b1ed4ca86a1b";

router.get('/:city',async (req,res)=>{
    // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`
    // ).then(response =>
    //     res.send({
    //         id: response.data.id,
    //         name: response.data.name,
    //         temp: response.data.main.temp
    //     }))
    
// ? podríamos hacerlo aun mas facil
    
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}&units=metric`
        )
        const data={
            id: response.data.id,
            name: response.data.name,
            temp: response.data.main.temp
        }
        res.send(data)
    } catch (error) {
        res.status(404).send(error.toString())
    }
})

//transformar a json es si usamos fetch, axios es acceder .data


module.exports = router;