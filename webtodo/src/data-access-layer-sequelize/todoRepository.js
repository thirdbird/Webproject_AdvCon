
module.exports = function ({ todoModel }) {

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
        },

        updateTodoById: function(todo,callback){
            todoModel.update({todo: todo.todo}, {where: {id:todo.id}})
                .then(function(todo){
                    callback([], todo)
                })
                .catch(function(error){
                    callback([error])
                })
        },

        deleteTodo: function(id,callback){
            todoModel.destroy({where: {id: id}})
            .then(function(deleteTodo){
                callback([],deleteTodo)
            })

        }
    }
}