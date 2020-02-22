const accountRepository = require('../data-access-layer/accountRepository')
const accountValidator = require('./accountValidator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
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

exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}

exports.getAccount = function(account, callback){
	accountRepository.getAccount(account, callback)
}
