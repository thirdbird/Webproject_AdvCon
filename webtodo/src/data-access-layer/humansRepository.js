const db = require('./db')

/*
	Retrieves all accounts ordered by username.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllHumans = function(callback){
	
	db.query("SELECT * FROM humans", function(error, humans){
		// TODO: Also handle errors.  
		callback(humans)
	})
	
}

exports.createHumans = function(username, age){
	
}