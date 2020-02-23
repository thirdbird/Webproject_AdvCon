const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 50
const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 255

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("Username is missing")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("Username is too short")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("Username is too long")
	}

	//Validate password.
	if(!account.hasOwnProperty("password")){
		errors.push("Password is missing")
	}else if(account.password.length < MIN_PASSWORD_LENGTH){
		errors.push("Password is too short")
	}else if(account.password.length > MAX_PASSWORD_LENGTH){
		errors.push("Password is too long")
	}

	//Validate second password match.
	if(!account.hasOwnProperty("confirmPassword")){
		errors.push("Password is missing")
	}else if(account.password != account.confirmPassword){
		errors.push("Password doesn't match")
	}
	
	return errors
}

exports.getErrorsExistingAccount = function(account){
	const errors= []

	//TODO

	return errors
}