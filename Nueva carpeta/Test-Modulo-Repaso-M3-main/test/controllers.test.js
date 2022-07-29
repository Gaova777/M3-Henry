const { 
  getUsers,
  reset,
  postUser,
  updateUser,
  deleteUser,
  findUserTasks,
  postTask,
  updateTask,
  deleteTask,
  completeTask
} = require('../controllers/controllers.js');



describe("--------Controllers--------",()=>{
  beforeEach(()=>{
    reset()
  })

  describe("getUsers",()=>{
    it("Inicialmente retorna un array vacio", ()=>{
     return getUsers()
     .then((response)=>{
       expect(response).toHaveLength(0)
       expect(response).toEqual([])
     })
    })
  })

  describe("postUser",()=>{
    it("Si no se pasa el userName arroja un error", async ()=>{
      await expect( postUser()).rejects.toThrow("userName puede ser solo de tipo string");
    })
    it("Si el userName es distinto de un string arroja un error", async ()=>{
      await expect( postUser(1)).rejects.toThrow("userName puede ser solo de tipo string");
    })
    it("Crea el usuario con sus propiedades y lo agrega correctamente", async ()=>{

      const newUser = await postUser("Dani")
      const allUsers = await getUsers()
      expect(newUser).toEqual({
        id:1,
        userName:"Dani",
        tasks:[]
      })
      expect(allUsers).toHaveLength(1)
    })
  })

  describe("updateUser",()=>{
      it("Si no se pasa el userName o el id arroja un error",async ()=>{
        await expect( updateUser(1)).rejects.toThrow("El id o el userName son requeridos");
      })
      it("Actualiza el usuario correctamente y retorna un mensaje descriptivo", async ()=>{
        const newUser =  await postUser("Dani")
        const mensaje = await updateUser(newUser.id ,"Franco")
        expect(mensaje).toBe("Usuario modificado exitosamente")
        const allUsers = await getUsers()
        const userUpdate = allUsers.find(user => user.id === newUser.id)
        expect(userUpdate).toBeTruthy()
        expect(userUpdate.userName).toBe("Franco")
      })
  })

  describe("deleteUser",()=>{
    it("Si no se pasa el id arroja un error",async ()=>{
      await expect( deleteUser()).rejects.toThrow("El id es un valor requerido");
    })
    it("Si se pasa un id no valido arroja un error", async ()=>{
      await expect( deleteUser(1)).rejects.toThrow("El usuario no existe");
    })
    it("Elimina el usuario correctamente y lo retorna", async ()=>{
      await Promise.all([
        postUser("Dani"),
        postUser("Franco"),
        postUser("Toni")
      ])
      const allUsers = await getUsers()
      const userToDelete = await deleteUser(allUsers[0].id)
      expect(userToDelete).toEqual(allUsers[0])
      expect(await getUsers()).toHaveLength(2)
    })  
  })
  describe("postTask",()=>{
    it("Si no se pasa el id o la descripcion de la task arroja un error", async ()=>{
      await expect( postTask(null,1)).rejects.toThrow("faltan datos")
    })
    it("Si se pasa un id invalido arroja un error", async ()=>{
      await expect( postTask("Aprobar M3",1)).rejects.toThrow("El usuario no existe")
    })
    it("Si se pasan todos los datos crea la tarea y agrega al usuario correspondiente", async ()=>{
      const user = await postUser("Toni")
      await postTask("Aprobar M3",user.id)
      const userTask = await postTask("Aprobar M4",user.id)
      expect(userTask.tasks[0]).toEqual({
        completed:false,
        description: "Aprobar M3",
        id:1
      })
      expect(userTask.tasks[1]).toEqual({
        completed:false,
        description: "Aprobar M4",
        id:2
      })
    })
  })
  describe("findUserTasks",()=>{
    it("Si no se pasa el id arroja un error", async ()=>{
      await expect( findUserTasks()).rejects.toThrow("El id es requerido")
    })
    it("Si se pasa un Id no correspondiente a un usuario arroja un error", async ()=>{
      await expect( findUserTasks(1)).rejects.toThrow("El id es invalido")
    })  
    it("Trae todas las tareas de un usuario", async ()=>{
      const user = await postUser("Franco")
      await postTask("Aprobar PI",user.id)
      const tasks = await findUserTasks(user.id)
      expect(tasks).toHaveLength(1)
    })  
    it("Trae todas las tareas de un usuario con un estado en espesifico", async ()=>{
      const user = await postUser("Franco")
      await postTask("Aprobar PI",user.id)
      const tasksCompleted = await findUserTasks(user.id,"true")
      expect(tasksCompleted).toHaveLength(0)
      const tasksToComplete = await findUserTasks(user.id,"false")
      expect(tasksToComplete).toEqual([{completed: false, description: "Aprobar PI", id: 1}])
    })   
  })
  
  describe("updateTask",()=>{
    it("Si no se pasa uno de los argumentos arroja un error", async ()=>{
      await expect( updateTask(1,"Tarea Edit")).rejects.toThrow("faltan datos")
    })
    it("Si el id no corresponde a un usuario arroja un error", async ()=>{
      await expect( updateTask(1,"Tarea Edit",1)).rejects.toThrow("el usuario no existe")
    })
    it("Si el id de la tarea no se encuentra arroja un error",async ()=>{
      try {
       const user =  await postUser("Martina")
       await updateTask(user.id,"Tarea Edit",1)
      } catch (error) {
        expect(error.message).toBe("la tarea no existe")
      }
    })
    it("Actualiza la tarea correctamente",async ()=>{
       const user =  await postUser("Martina")
       const userTasks = await postTask("Aprobar el PF",user.id)
       const task =  await updateTask(user.id,"Tarea editada",userTasks.tasks[0].id)
        expect(task).toEqual({
          id:userTasks.tasks[0].id,
          description:"Tarea editada",
          completed: userTasks.tasks[0].completed
        })
    })
  })
  describe("deleteTask",()=>{
    it("Si no se pasa uno de los argumentos arroja un error", async ()=>{
      await expect( deleteTask(1)).rejects.toThrow( /requeridos/g)
     })
     it("Si el id no corresponde a un usuario arroja un error", async ()=>{
      await expect( deleteTask(1,1)).rejects.toThrow("el usuario no existe")
     })
     it("Si el id de la tarea no se encuentra arroja un error",async ()=>{
       try {
        const user =  await postUser("Martina")
        await deleteTask(user.id,1)
       } catch (error) {
         expect(error.message).toBe("la tarea no existe")
       }
     })
     it("Elimina la tarea correctamente",async ()=>{
        const user =  await postUser("Martina")
        const userTasks = await postTask("Aprobar el PF",user.id)
        expect(userTasks.tasks).toHaveLength(1)
        await deleteTask(user.id,userTasks.tasks[0].id)
        expect(userTasks.tasks).toHaveLength(0)
     })

  })
  describe("completeTask",()=>{
    it("Si no se pasa uno de los argumentos arroja un error", async ()=>{
      await expect( completeTask(1) ).rejects.toThrow( /requeridos/g)
     })
     it("Si el id no corresponde a un usuario arroja un error", async ()=>{
      await expect( completeTask(1,1) ).rejects.toThrow("el usuario no existe")
     })
     it("Si el id de la tarea no se encuentra arroja un error",async ()=>{
       try {
        const user =  await postUser("Martina")
        await completeTask(user.id,1)
       } catch (error) {
         expect(error.message).toBe("la tarea no existe")
       }
     })
     it("Cambia el estado de la tarea correctamente",async ()=>{
      const user =  await postUser("Martina")
      const userTasks = await postTask("Aprobar el PF",user.id)
      expect(userTasks.tasks).toHaveLength(1)
      await completeTask(user.id,userTasks.tasks[0].id)
      expect(userTasks.tasks[0]).toEqual({
        id:userTasks.tasks[0].id,
        description:userTasks.tasks[0].description,
        completed:true
      })
      await completeTask(user.id,userTasks.tasks[0].id)
      expect(userTasks.tasks[0]).toEqual({
        id:userTasks.tasks[0].id,
        description:userTasks.tasks[0].description,
        completed:false
      })
   })
  })
})