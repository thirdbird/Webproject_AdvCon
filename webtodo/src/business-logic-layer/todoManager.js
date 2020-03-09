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
		},

		updateTodoById: function(todo, callback){
			todoRepository.updateTodoById(todo,callback)
		},

		deleteTodo: function(id,callback){
			todoRepository.deleteTodo(id,callback)
		}
	}
}
