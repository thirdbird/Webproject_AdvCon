const db = require('./db')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
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

/*
	Retrieves the account with the given username.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username.
*/
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

/*
	Retrieves the account with the given username and password.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that username with that password.
*/
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

/*
	Creates a new account.
	account: {username: "The username", password: "The password"}
	Possible errors: databaseError, usernameTaken
	Success value: The id of the new account.
*/
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