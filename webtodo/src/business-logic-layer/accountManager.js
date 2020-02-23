const accountRepository = require('../data-access-layer/accountRepository')
const accountValidator = require('./accountValidator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.getAccountByUsername = function(account, callback){
	accountRepository.getAccountByUsername(account, callback)
}

exports.getAccount = function(account, callback){

	const errors = accountValidator.getErrorsExistingAccount(account)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	accountRepository.getAccount(account, callback)
}

exports.createAccount = function(account, callback){
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(account)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	
	accountRepository.createAccount(account, callback)
	
}




