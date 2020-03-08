//CRUD operation on todolist resource
const express = require('express')

module.exports = function ({ todoManager }) {

    const router = express.Router()

    router.get('/', function (request, response) {
        try {
            todoManager.getAllTodos(function (errors, todos) {
                const model = {
                    errors: errors,
                    todos: todos,
                }
                console.log(todos)
                response.status(200).json(model)
            })
        } catch (error) {
            response.status(500).end()
        }
    })

    router.post('/', function (request, response) {
        const todo = request.body.todo
        console.log(todo)
        
        try {
        todoManager.createTodo(todo, function (errors, todo) {
            todoManager.getAllTodos(function (errors2, todos) {
                const model = {
                    errors: errors,
                    errors2: errors2,
                    todo: todo,
                    todos: todos,
                }
                response.status(201).json(model)
            })
        })
        } catch (error) {
            response.status(500).end()
        } 
    })

    return router
}