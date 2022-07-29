const changePromiseFunction = require('../utils.js');

let users = []


let id = 0

module.exports = {
    reset:function(){
        // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.
        users=[]
        id = 0
    },
    getUsers : (...args)=>{
        return changePromiseFunction(()=>{

        },...args)
    },
    postUser : (...args)=>{
        return changePromiseFunction((userName)=>{

      
        },...args)
    },
    updateUser : (...args)=>{
        return changePromiseFunction((id, userName)=>{
  
      
        },...args)
    },
    deleteUser : (...args)=>{
        return changePromiseFunction((id)=>{
  
      
        },...args)
    },
    postTask : (...args)=>{
        return changePromiseFunction((description, id)=>{

      
      
        },...args)
    },
    findUserTasks : (...args)=>{
      return changePromiseFunction((id,state)=>{

    
    
      },...args)
    },
    updateTask : (...args)=>{
        return changePromiseFunction((id, description, taskId)=>{
    
        },...args)
    },
    deleteTask : (...args)=>{
        return changePromiseFunction((id, taskId)=>{
    
        },...args)
    },
    completeTask : (...args)=>{
        return changePromiseFunction(( id, taskId)=>{
    
      
        },...args)
    }
}
