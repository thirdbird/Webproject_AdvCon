
module.exports = function ({ todoModel }) {

    return {

        getAllTodos: function (accountId,callback) {
            todoModel.findAll({where: {account_id: accountId}, raw: true })
                .then(function (todos) {
                    callback([], todos)
                })
                .catch(function () {
                    callback(["databaseError"], null)
                })

        },

        createTodo: function (todo, accountId, callback) {
            todoModel.create({ todo: todo, account_id: accountId })
                .then(function (todo) {
                     callback([], todo) 
                })
                .catch(function (error) {
                     callback([error], null) 
                })
        },

        updateTodoById: function (todo, callback) {
            todoModel.update({ todo: todo.todo }, { where: { id: todo.id } })
                .then(function (todo) {
                    callback([], todo)
                })
                .catch(function (error) {
                    callback([error])
                })
        },

        deleteTodo: function (id, callback) {
            todoModel.destroy({ where: { id: id } })
                .then(function (deleteTodo) {
                    callback([], deleteTodo)
                })
        }
    }
}