const db = require('./db')

module.exports = function ({ }) {

	return {
		getAllAccounts: function (callback) {
			const query = `SELECT * FROM accounts ORDER BY username`
			const values = []
			db.query(query, values, function (error, accounts) {
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

			db.query(query, values, function (error, accounts) {
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

		createAccount: function (account, callback) {
			const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`
			const values = [account.username, account.password]

			db.query(query, values, function (error, results) {
				if (error) {
					callback(['Username already exists'], null)
				} else {
					callback([], results.insertId)
				}
			})
		}
	}
}
