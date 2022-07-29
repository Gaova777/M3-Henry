'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor){
    if(typeof executor !== 'function') throw new TypeError('Executor must be a function')

    this._state = 'pending';//el this me va a señalar las instancias de toda la clase,  y señalamos la que nos indica el test

    this._handlerGroups=[];



    executor(this._internalResolve.bind(this), this._internalReject.bind(this)) // se va a ejecutar cada que hago una instancia, además acá justo estoy bindeando el llamado de resolve y reject en property ya que antes el this que tienen al comienzo estaban volando cuando se llamaba la $Promise
}
$Promise.prototype._internalResolve = function(data){
    if(this._state==='pending'){
    this._state = 'fulfilled'
    // var a = {status: 'pending'}--a.value=data-->{status:'pending', value: 'data'}
    this._value = data
    this._callHandlers()
     }
}


$Promise.prototype._internalReject = function(reason){
    if(this._state==='pending'){
        this._state = 'rejected'
        // var a = {status: 'pending'}--a.value=data-->{status:'pending', value: 'data'}
        this._value = reason
        this._callHandlers()
         }
}

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb!=='function') successCb = false
    if(typeof errorCb!=='function') errorCb = false
    //la instancia de la clase promesa

    const downstreamPromise = new $Promise (function(){})
    
    this._handlerGroups.push({
        successCb, //como tiene el msmo nombre de las props puedo hacer salto y seguir escribiendo las props ES6
        errorCb,
        downstreamPromise
    })
    if(this._state!=='pending'){
        this._callHandlers()
    }
    return downstreamPromise;
}
//sabemos que en ._handlerGroups se guardan obejtitos ---> [{sCB1, eCV1},...{sCBn,eCBn}] necesitamos sacar uno por uno e ir resolviendo lo que hay en el objetito
$Promise.prototype._callHandlers= function(){
    while(this._handlerGroups.length){//mientras haya algo en el array haceme lo sgte 
        //vamos sacando cada valor con shift

        var handler = this._handlerGroups.shift()
        if(this._state==='fulfilled'){
         // handler.successCb &&  handler.successCb(this._value)//primer valor antes ampersand me rpegunta si existe, porque que tal que fuera "hoolliiii" y no una promise en successCB
            if(!handler.successCb){
                handler.downstreamPromise._internalResolve(this._value)
            }else{
                try {
                    const result = handler.successCb(this._value)
                    //----si arroja error lo que esta abajo dentro del try no lo ejecuta

                    if(result instanceof $Promise){
                        // el handler devolvio una promesa
                        result.then(value =>{
                            
                        handler.downstreamPromise._internalResolve(value)//que hacemos acá, como result es una promesa, entonces el valor que me devuelve que es una promesa necesitamos resolverlo, pr eso la aplicamos como si fuera en el array una promesa en su handler, y despues la ejectuamos con internal resolve 
                        }, err=>{
                            handler.downstreamPromise._internalReject(err)
                        })
                    }else{
                        //el handler devolvio un valor, osea que el result es valor
                        handler.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    handler.downstreamPromise._internalReject(error)
                    
                }
            }
        
        }else{
            //handler.errorCb && handler.errorCb(this._value)

            if(!handler.errorCb){
                handler.downstreamPromise._internalReject(this._value)
            }else{
                try {
                    const result = handler.errorCb(this._value)
                    //....lo de apartir de acá a abajo lo rechaza
                    if(result instanceof $Promise){
                        result.then(value =>{
                            handler.downstreamPromise._internalResolve(value)
                        }, err => {
                            handler.downstreamPromise._internalReject(err)
                        })
                    }else{
                        //sino es una promesa es un valor
                        handler.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                    handler.downstreamPromise._internalReject(error)
                }
            }
        }
    }
}

$Promise.prototype.catch = function(errorCb){
   return this.then(null, errorCb)
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
