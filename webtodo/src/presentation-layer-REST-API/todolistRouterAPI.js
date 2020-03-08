//CRUD operation on todolist resource
const express = require('express')


module.exports = function ({ todoManager }) {

    const router = express.Router()

    //router.use(express.urlencoded({ extended: false })) //TODO change to body-parser

    router.get('/', function (request, response) {
        try {
            todoManager.getAllTodos(function(errors,todos){
                const model = {
                    errors: errors,
                    todos: todos,
                }
                response.json(model)
            })
        }catch(error) {
            response.json({message:err})
        }
    })

    router.post('/', function (request, response) {
        const todo = request.body.todo
        console.log(todo)
    })





    return router
}