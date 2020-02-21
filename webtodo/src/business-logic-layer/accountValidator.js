const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 50
const MIN_PASSWORD_LENGTH = 3
const MAX_PASSWORD_LENGTH = 20

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	
	// Validate username.
	if(!account.hasOwnProperty("username")){
		errors.push("usernameMissing")
	}else if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push("usernameTooLong")
	}

	//Validate password.
	if(!account.hasOwnProperty("password")){
		errors.push("passwordMissing")
	}else if(account.password.length < MIN_PASSWORD_LENGTH){
		errors.push("passwordTooShort")
	}else if(account.password.length > MAX_PASSWORD_LENGTH){
		errors.push("passwordTooLong")
	}

	if(!account.hasOwnProperty("confirmPassword")){
		errors.push("passwordMissing")
	}else if(account.password != account.confirmPassword){
		errors.push("passwordDontMatch")
	}
	
	return errors
}