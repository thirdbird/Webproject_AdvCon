const express = require('express')

module.exports = function ({ todoManager }) {

    const router = express.Router()

    router.get('/', function (request, response) {
        const accountId = request.session.account.id


        todoManager.getAllTodos(accountId, function (errors, todos) {
            const model = {
                errors: errors,
                todos: todos,
                account: request.session.account,
                loggedIn: request.session.loggedIn
            }
            response.render('todolist-list-all.hbs', model)
        })

    })

    router.post('/', function (request, response) {
        const todo = request.body.todo
        const formHolder = {
            todo: request.body.todo
        }
        const accountId = request.session.account.id
        todoManager.createTodo(todo, accountId, function (errors, todo) {
            todoManager.getAllTodos(accountId, function (errors2, todos) { 
                const model = {
                    errors: errors,
                    errors2: errors2,
                    todo: todo,
                    todos: todos,
                    account: request.session.account,
                    loggedIn: request.session.loggedIn,
                    formHolder: formHolder
                }
                if (errors.length != 0) {
                    response.render("todolist-list-all.hbs", model)
                }
                else {
                    response.render("todolist-list-all.hbs", model)
                }
            })
        })

    })

    return router

}


