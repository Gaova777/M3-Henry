// ---------------------------REPASO-----------------------------------

// const pA = new Promise(function(resolve, reject){
// setTimeout(()=>{
//     //resolve('se Resolvió A')
//     reject('Se resolvio A')
// }, 1000)
// })

// console.log('1: ', pA)//pending

// pA.then(data => {
//     console.log('2: ', data)//s resolvio A
//     //si le aplicamos el reject sin colocarle el alrgumento de error al .then, entonces me va a colocar un mensaje extraño diciendome que no opté por algun plan, pero si le colocamos el error--->
// }, err => {
//     console.log('3: ', err)
// })

//------------------------------------FLOWCHART---------------------------
const pA = new Promise(function(resolve, reject){
setTimeout(()=>{
    resolve('se Resolvió A')
    // reject('Se RECHAZOOO A')
}, 1000)
})

//-----------------------------EJEMPLOS--------------------------


// const pB = pA.then()

// console.log('1: ', pB);// esto quiere decir que me copio la promesa en pB como si fuese una variable que me guarda una funcion


// //podemos corrobororarlo acá

// pB.then(data =>{
//     console.log('2: ', data)
// })


//--------------------------------------------------------------------------

// pA
// .then()// copia del anterior de acá pa abajo ----> pB----> resolve( se resolvio A)
// .then()//pC---> resolve(se resolvio A)
// .then()//pC---> resolve(se resolvio A)
// .then(data => {
//     console.log('Y esto??', data)// se resolvio A
// })
// .then(null, err=>{
//     console.log('a veeeerr!', err) //igualmente sucede cuando hay un error es un pasamanos para cuendo sucede un error
// })//funciona igual que el catch.

//-------------------------------------------------------------------------

// pA.then(data => {
//     console.log('1: ', data)// 1: se resolvio A
//     return 'holaaaa'
// })
// .then(data => {
//     console.log('2: ', data)// 2: holaaaa
    
// })
// .then(null, err => {//si lo aplicamos al errhandler es igual, cuando retornamos un valor el siguiente succes handler va a ejecutarse con dicho valor
//     console.log('3: ', err)
//     return 'oiiurreert'
// })
// .then(algo =>{
//     console.log('4: ', algo) // oiiurreert
// })

//-----------------------------------------------------------------------
// pA
// .then(data =>{
//     console.log('1: ', data)//se resolvio A
//     return new Promise(function(resolve, reject){//promize Z
//         setTimeout(()=>{
//             //resolve('SE RESOLVIO ESTA OTRA')
//              reject('se rechazo esta otra')
//         }, 1000)
//     })
// })
// .then(data => {// promesa B
//     console.log('2: ', data)// 2: 'SE RESOLVIIO ESTA OTRA'
//     return data.toLowerCase()// se resolvio esta otra
// })
// .then(data =>{
//     console.log('3: ', data) //3: se resolvio esta otra     
// })
// .then(null, err=>{
//     console.log('4: ', err)// si rejectamos o aplicamos el error, jamas va a tocar los succes handler anteriores, va a venir hasta que encuentre el caminito que le permita consologuear el error
// })

//---------------------------------------------------------------

pA
.then(data=>{
    console.log('1: ', data)
    throw new TypeError('ROMPIOOOOOO')
})
.then(data=>{
    console.log('2: ', data)
})
.then(null, err=>{
    console.log('3', err)//el typeerrror que es una instancia y esta siendo retornada con el throw, es lo mismo que return, por lo tanto solo buscara el errorHandler.S
})