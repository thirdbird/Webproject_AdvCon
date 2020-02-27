//const todoRepository = require('../data-access-layer/todoRepository')
const todoValidator = require('./todoValidator')

module.exports = function({todoRepository}){
	return{
		getAllTodos: function(callback){
			todoRepository.getAllTodos(function(errors, todos){
				callback(errors, todos)
			  })
		},

		createTodo: function(todo,callback){
			const errors = todoValidator.checkErrors(todo)
			if(0 < errors.length){
				callback(errors, null)
				return
			}
			todoRepository.createTodo(todo, function(errors,todo){
				callback(errors,todo)
			})
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