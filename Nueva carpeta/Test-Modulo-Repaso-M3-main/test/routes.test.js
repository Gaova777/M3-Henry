/* eslint-disable no-unused-expressions */
'use strict';
const request = require('supertest');
const app = require('../app.js');
const { getUsers, postUser, reset, postTask, completeTask, findUserTasks } = require('../controllers/controllers.js');
let server = request(app);

describe("/users", ()=>{
    beforeEach(()=>{
        reset()
    })
    describe("GET", ()=>{  
        it("Trae todos los usuarios",async ()=>{
            const response = await server.get("/users")    
            expect(response.body).toEqual(await getUsers());
            await postUser("Matias")
            const secondResponse = await server.get("/users") 
            expect(secondResponse.body).toHaveLength(1)
        })
    })
    describe("POST", ()=>{
        it("Agrega al usuario correctamente", async ()=>{
            const response = await server.post("/users").send({userName:"Franco"})    
            expect(response.statusCode).toBe(201)
            const users = await getUsers()
            expect(users).toHaveLength(1)
            expect(users[0]).toEqual({
                id:1,
                userName:"Franco",
                tasks:[]
            });
        })
    })
    describe("PUT /users",()=>{
        it("Modifica al usuario correctamente", async ()=>{
            const user = await postUser("Matias")
            const response = await server.put("/users").send({userId :user.id, userName:"Toni"})    
            expect(response.statusCode).toBe(204)
            const users = await getUsers()
            expect(users).toHaveLength(1)
            expect(users[0]).toEqual({
                id:1,
                userName:"Toni",
                tasks:[]
            });
        })
    })
    describe("DELETE /users/:id",()=>{     
        it("Elimina al usuario correctamente", async ()=>{
            const user = await postUser("Franco")
            const allUsers = await getUsers()
            expect(allUsers).toHaveLength(1)
            const response = await server.delete(`/users/${user.id}`)   
            expect(response.statusCode).toBe(204)
            const users = await getUsers()
            expect(users).toHaveLength(0)
        })
    })
}) 

describe("/task",()=>{

    describe("GET /task",()=>{     
        it("Devuelve un status 400 si no se pasan los datos", async ()=>{
            const response = await server.get('/tasks')    
            expect(response.statusCode).toBe(400);
        })
        it("Devuelve todas las tareas del usuario pasado por query", async ()=>{
            const { id } = await postUser("Dani")
            const user = await postTask("Clase 07",id)
            const response = await server.get(`/tasks?userId=${id}`)   
            expect(response.body).toEqual(user.tasks)
        })
        it("si recibe un estado(T/F), devuelve solo aquellas tareas que matcheen con el estado", async ()=>{
            const { id } = await postUser("Dani")
            await postTask("Clase 07",id)
            const {tasks:[task]} = await postTask("Clase 08",id)
            await completeTask(id, task.id)
            const userTasks = await findUserTasks(id)
            console.log(userTasks)

            const response = await server.get(`/tasks?userId=${id}&state=true`)   

            expect(response.body).toEqual([{...userTasks[0]}])
            const responseTwo = await server.get(`/tasks?userId=${id}&state=false`)   

            expect(responseTwo.body).toEqual([{...userTasks[1]}])
        })        
    })

    describe("POST /task",()=>{     
        it("Debe agregar la tarea recibida por body al usuario correspondiente", async ()=>{
            const user = await postUser("Toni")
            const response = await server.post('/tasks').send({description:"Repaso M3", userId:user.id})
            const tasks = await  findUserTasks(user.id)
            expect(response.statusCode).toBe(201);
            expect(response.body.tasks).toEqual(tasks);
        })
        it("el id debe ser incremental y distinto al de las otras tareas", async ()=>{
            const user = await postUser("Toni")
            await server.post('/tasks').send({description:"Repaso M3", userId:user.id})
            await server.post('/tasks').send({description:"Repaso M2", userId:user.id})
            const tasks = await  findUserTasks(user.id)
            expect(tasks[1].id).toBeGreaterThan(tasks[0].id)
        })
        it("Devuelve un status 400 si la tarea esta vacia",async  ()=>{
            const response = await server.post('/tasks').send({description:"", userId:1})
            expect(response.statusCode).toBe(400);
        })
    })

    describe("PUT /task",()=>{     
        it("Debe modificar la tarea  recibida", async ()=>{
            const {id} = await postUser("Toni")
            const user = await postTask("Clase 07",id)
            const response = await server.put(`/tasks?userId=${id}`)
                .send({description:"Repaso M3", taskId:user.tasks[0].id})
            expect(response.statusCode).toBe(204);
            const tasks = await findUserTasks(id)
            expect(tasks).toEqual([ { completed: false, description: 'Repaso M3', id: user.tasks[0].id } ])
        })
        it("Devuelve 400 si la modificacion recibida esta vacia", async ()=>{
            const {id} = await postUser("Toni")
            const user = await postTask("Clase 07",id)
            const response = await server.put(`/tasks?userId=${id}`)
                .send({description:"", taskId:user.tasks[0].id})
            expect(response.statusCode).toBe(400);
        })
    })
    
    describe("DELETE /task/:userId",()=>{     
        it("Debe eliminar la tarea indicado", async ()=>{
            const {id} = await postUser("Nacho")
            await postTask("Clase 07",id)  
            const { tasks } = await postTask("Repaso M2",id)  
            const response = await server.delete(`/tasks/${id}`).send({ taskId:tasks[0].id })
            expect(response.statusCode).toBe(204)
            expect(await  findUserTasks(id)).toHaveLength(1)
        })
        it("Devuelve un mensaje descriptivo si no se pasan todos los datos", async ()=>{
            const {id} = await postUser("Nacho")
            await postTask("Clase 07",id)  
            const response = await server.delete(`/tasks/${id}`)
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toMatch( /requeridos/g)
        })
    })
    describe("PUT /task/complete/:taskId",()=>{     
        it("Cambia el estado completada a true", async ()=>{
            const { id } = await postUser("Nacho")
            await postTask("Clase 07",id)  
            const { tasks:[task] } = await postTask("Repaso M2",id)  
            const response = await server.put(`/tasks/complete/${task.id}`).send({ userId:id })
            expect(response.statusCode).toBe(204)
        })  
        it("Devuelve un mensaje descriptivo si no se pasan todos los datos", async ()=>{
            const {id} = await postUser("Martin")
            const { tasks:[task] } = await postTask("Clase 07",id)  
            const response = await server.put(`/tasks/complete/${task.id}`)
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toMatch( /requeridos/g)
        })    
    })
})




