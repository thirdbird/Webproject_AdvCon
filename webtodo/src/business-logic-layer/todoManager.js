//const todoRepository = require('../data-access-layer/todoRepository')
//const todoValidator = require('./todoValidator')

module.exports = function ({ todoRepository, todoValidator }) {
	
	return {
		getAllTodos: function (callback) {
			todoRepository.getAllTodos(callback)
		},

		createTodo: function (todo, callback) {
			const errors = todoValidator.todoErrors(todo)
			if (0 < errors.length) {
				callback(errors, null)
				return
			}
			todoRepository.createTodo(todo, callback)
		}
	}
}



/*
exports.getAllTodos = function(callback){
	todoRepository.getAllTodos(callback)
}

exports.createTodo = function(todo, callback){

    const errors = todoValidator.checkErrors(todo)
    console.log(errors)
    if(0 < errors.length){
		callback(errors, null)
		return
	}

	todoRepository.createTodo(todo, callback)
}
*/