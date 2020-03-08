//CRUD operation on todolist resource
const express = require('express')

module.exports = function ({ todoManager }) {

    const router = express.Router()

    router.get('/', function (request, response){
        todoManager.getAllTodos(function(errors, todos){
            if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(200).json(todos)
            }
        })
    })

    router.post('/', function (request, response) {
        const todo = request.body.todo
        console.log(todo)
        todoManager.createTodo(todo, function (errors, todo) {
            todoManager.getAllTodos(function (errors2, todos) {
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }else if(0 < errors.length || 0 < errors2.length){
                    response.status(400).json(errors)
                }else{
                    response.setHeader("Location", "/todolist/"+todo.id)
                    response.status(201).end()
                }
            })
        })
    })

    router.put('/:id', function(request,response){
        const id = request.params.id
        const todo = request.body.todo

        todoManager.updateTodoById(todo,id,function(errors,todoExists){
            if(errors.includes("databaseError")){
                response.status(500).end()
            }else if(0 < errors.length){
                response.status(400).json(errors)
            }else if(!todoExists){
                response.status(404).end()
            }else{
                response.status(204).end()
            }
        })

    })

    router.delete('/', function(request,response){
        //delete a todo
    })

    return router
}