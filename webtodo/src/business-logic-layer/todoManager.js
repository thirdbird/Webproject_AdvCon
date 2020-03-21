
module.exports = function ({ todoRepository, validator }) {

	return {
		getAllTodos: function (accountId, callback) {
			todoRepository.getAllTodos(accountId, callback)
		},

		createTodo: function (todo, accountId, callback) {
			const errors = validator.todoErrors(todo)

			if (0 < errors.length) {
				callback(errors, null)
				return
			}

			todoRepository.createTodo(todo, accountId, callback)
		},

		updateTodoById: function (todo, callback) {
			todoRepository.updateTodoById(todo, callback)
		},

		deleteTodo: function (id, callback) {
			todoRepository.deleteTodo(id, callback)
		}
	}
}
