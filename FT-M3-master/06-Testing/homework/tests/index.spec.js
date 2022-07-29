const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const { sumArray } = require('../utils')
const { pluck } = require('../utils')

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
    it('responds with the sum of 2 and 5', () =>
      agent.post('/sum')
        .send({a: 2, b: 5})
        .then((res) => {
          expect(res.body.result).toEqual(7);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 4})
        .then((res) => {
          expect(res.body.result).toEqual(8);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('responds with true if two numbers of array when it sum are equal', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));//debemos hacer una funcion y lo optimo sería en un archivo extra que se llame utils.js
  });


  describe('Function sumArray', ()=>{
    const array = [1,2,3,4]
    it('should return true if two numbers of the array sum the number', ()=>{
      expect(sumArray(array, 7)).toEqual(true) 
    })
    it('should return false if two numbers of the array no sum the number', ()=>{
      expect(sumArray(array, 99)).toEqual(false) 
    })
    it('should return an error if the first parameter isnt array', ()=>{
      expect(()=> sumArray(4, 7)).toThrow(TypeError) //si la envuelvo en arrow function se me vuelve una funcion para ejecutar mas no algo ya ejecutable como lo sería sumArray(algo) así solito
    })
    it('deberia retornar false si busco el 2', ()=>{
      expect(sumArray(array, 2)).toEqual(false)
    })
    it('deberia retornar false si busco el 8', ()=>{
      expect(sumArray(array, 8)).toEqual(false)
    })
    
  })

  describe('POST a /numString', ()=>{
    it('responde con 400 sino le mando body',()=>agent.post('/numString').expect(400))

    it('si le mando hola me devuelva 4',()=>{
      agent.post('/numString')
      .send({word:'hola'})
      .then((res)=>{
        expect(res.body.result).toEqual(4)
      })
    })
  })

describe('function pluck', ()=>{
  const array =[{nombre: 'fede', apepllido: 'garzon', ciudad: 'roldanillo'}, {nombre: 'Moni', apepllido: 'Cano', ciudad: 'viterbo'}]
  it('retorna un array con solo nombres',()=>{
    expect(pluck(array, 'nombre')).toEqual(['fede','Moni'])
  })
})

describe('POST a /pluck', ()=>{
  const array =[{nombre: 'fede', apepllido: 'garzon', ciudad: 'roldanillo'}, {nombre: 'Moni', apepllido: 'Cano', ciudad: 'viterbo'}]
  it('if send an array and name, return an array just with names', ()=>{
    agent.post('/pluck')
    .send({array: array, prop: 'nombre'})
    .then((res)=>{
      expect(res.body.result).toEqual(['fede','Moni'])
    })
  })
})

});

