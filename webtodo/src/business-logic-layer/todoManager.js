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

		updateTodoById: function(todo, id, callback){
			todoRepository.updateTodoById(todo,id,callback)
		}
	}
}
