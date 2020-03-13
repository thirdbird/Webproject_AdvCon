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










/*const db = require('./db')

exports.getAllTodos = function(callback){

	const query = `SELECT * FROM todos`
	const values = []

	db.query(query, values, function(error, todos){
		if(error){
            console.log(error)
			callback(['databaseError'], null)
		}else{
			callback([], todos)
		}
	})

}

exports.createTodo = function(todo, callback){

	const query = `INSERT INTO todos (todo) VALUES (?)`
	const values = [todo]

	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for todoUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}
	})

}*/

//make todo as marked completed or just delete it