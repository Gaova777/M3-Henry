function sumArray(array,n){
    //preguntemos si el array eess un array
    if(!Array.isArray(array)) throw new TypeError('array')
    if(typeof n !== 'number') throw new TypeError('number')

    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j <array.length; j++){
            if(array[i] + array[j] === n){
                return true
            }
        }
        
    }
    return false

}
// * en return hacer bracket notation para traerse el color --> obj.'color' no se puede,  ---> obj.[color]
  //[{color: rojo, ruedas: 4},{color:verde, ruedas: 4}]--->'color'-->['rojo','verde']
function pluck(array, prop){
    return array.map(o=>o[prop])
}

module.exports ={
    sumArray,
    pluck
}