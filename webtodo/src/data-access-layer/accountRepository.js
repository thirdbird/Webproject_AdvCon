//const db = require('./db')

module.exports = function ({ dbConnection }) {

	return {
		getAllAccounts: function (callback) {
			const query = `SELECT * FROM accounts ORDER BY username`
			const values = []
			dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts)
				}
			})
		},

		getAccountByUsername: function (account, callback) {
			const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
			const values = [account.username]

			dbConnection.query(query, values, function (error, accounts) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], accounts[0])
				}
			})
		},

		getAccount: function (account, callback) {
			const query = `SELECT * FROM accounts WHERE username = ? AND password = ?`
			const values = [account.username, account.password]

			db.query(query, values, function (error, accounts) {
				if (accounts.length > 0) {
					callback([], accounts[0])
				} else {
					callback(["Username or password doesn't match"], null)
				}
			})
		},
		
		createAccount = function(account, callback){
			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [account.username, account.password]
		
			dbConnection.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(['Username already exists'], null)
				}else{
					callback([], results.insertId)
				}
			})
		
		}

	}
}

/*
exports.getAllAccounts = function(callback){

	const query = `SELECT * FROM accounts ORDER BY username`
	const values = []

	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
}

exports.getAccountByUsername = function(account, callback){

	const query = `SELECT * FROM accounts WHERE username = ? LIMIT 1`
	const values = [account.username]

	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts[0])
		}
	})
}

exports.getAccount = function(account, callback){
	//"SELECT * from user_login WHERE user_email='"+req.body.user_email+"' AND `user_password`='"+req.body.user_password+"'"
	const query = `SELECT * FROM accounts WHERE username = ? AND password = ?`
	const values = [account.username, account.password]

	db.query(query, values, function(error, accounts){
		if(accounts.length > 0){
			callback([], accounts[0])
		}else{
			callback(["Username or password doesn't match"], null)
		}
	})
}

exports.createAccount = function(account, callback){

	const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
	const values = [account.username, account.password]

	db.query(query, values, function(error, results){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['Username already exists'], null)
		}else{
			callback([], results.insertId)
		}
	})

}

*/