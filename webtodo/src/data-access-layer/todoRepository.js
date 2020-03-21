const db = require('./db')

module.exports = function ({ }) {

	return {
		getAllTodos: function (accountId, callback) {
			const query = `SELECT * FROM todos WHERE account_id = ?`
			const values = [accountId]

			db.query(query, values, function (error, todos) {
				if (error) {
					console.log(error)
					callback(['databaseError'], null)
				} else {
					callback([], todos)
				}
			})
		},

		createTodo: function (todo, accountId, callback) {
			const query = `INSERT INTO todos (todo, account_id) VALUES (?, ?)`
			const values = [todo, accountId]

			db.query(query, values, function (error, results) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], results.insertId)
				}
			})
		},


	}
}