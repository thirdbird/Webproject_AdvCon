const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 50
const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 255

module.exports = function ({ }) {

	return {
		getErrorsNewAccount: function (account) {

			const errors = []

			// Validate username.
			if (account.username.length == 0) {
				errors.push("You have to enter a username")
			} else if (account.username.length < MIN_USERNAME_LENGTH) {
				errors.push("Username is too short")
			} else if (MAX_USERNAME_LENGTH < account.username.length) {
				errors.push("Username is too long")
			}

			//Validate password.
			if (account.password.length == 0) {
				errors.push("You have to enter a password")
			} else if (account.password.length < MIN_PASSWORD_LENGTH) {
				errors.push("Password is too short")
			} else if (account.password.length > MAX_PASSWORD_LENGTH) {
				errors.push("Password is too long")
			}

			//Validate second password match.
			if (account.password != account.confirmPassword) {
				errors.push("Password doesn't match")
			}

			return errors
		},

		getErrorsExistingAccount: function (account) {
			const errors = []

			//Validate account.
			if (account.username.length == 1) {
				errors.push("You have to enter a username")
			} else if (account.username.length == 1) {
				errors.push("Username is too short")
			}
			//Validate password.
			if (account.password.length == 1) {
				errors.push("You have to enter a password")
			} else if (account.password.length == 1) {
				errors.push("Password is too short")
			}
			//TODO

			return errors

		},

		validateSequelizeDataValues: function(accounts) {
			console.log("fix the db",accounts)
		}
	}
}

/*exports.getErrorsNewAccount = function(account){

	const errors = []

	// Validate username.
	if(account.username.length == 0){
		errors.push("You have to enter a username")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("Username is too short")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("Username is too long")
	}

	//Validate password.
	if(account.password.length == 0){
		errors.push("You have to enter a password")
	}else if(account.password.length < MIN_PASSWORD_LENGTH){
		errors.push("Password is too short")
	}else if(account.password.length > MAX_PASSWORD_LENGTH){
		errors.push("Password is too long")
	}

	//Validate second password match.
	if(account.password != account.confirmPassword){
		errors.push("Password doesn't match")
	}

	return errors
}

exports.getErrorsExistingAccount = function(account){
	const errors= []

	//Validate account.
	if(account.username.length == 1){
		errors.push("You have to enter a username")
	}else if(account.username.length == 1){
		errors.push("Username is too short")
	}
	//Validate password.
	if(account.password.length == 1){
		errors.push("You have to enter a password")
	}else if(account.password.length == 1){
		errors.push("Password is too short")
	}
	//TODO

	return errors
}*/
