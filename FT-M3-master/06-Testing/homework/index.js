const express = require('express');
const app = express();
const { sumArray, pluck } = require('./utils')

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  const {a, b}=req.body
  const result = a + b
  res.send({ result });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray',(req, res)=>{
  const {array, num} = req.body
  const result = sumArray(array, num)
  res.send({result})
})

app.post('/numString',(req, res)=>{
  const {word} = req.body
  if(!word) return res.sendStatus(400)
  const result = word.length
  res.send({result})
})

app.post('/pluck',(req, res)=>{
  const {array, prop} = req.body
  // if(!word) return res.sendStatus(400)
  const result = pluck(array, prop) //en el test le pasamos que array y que prop especificamente
  res.send({result})
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
