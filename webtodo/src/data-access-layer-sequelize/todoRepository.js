const todoModel = require('./todoModel')

module.exports = function ({ }) {

    return {

        getAllTodos: function (callback) {
            todoModel.findAll({ raw: true})
                .then(function (todos) {
                    callback([], todos)
                })
                .catch(function (error) {
                    callback([error], null)
                })

        },

        createTodo: function (todo, callback) {
            todoModel.create({ todo: todo })
                .then(function (todo) { callback([], todo) })
                .catch(function (error) { callback([error], null) })
        }
    }
}