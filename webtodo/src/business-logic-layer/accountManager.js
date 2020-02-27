//const accountRepository = require('../data-access-layer/accountRepository')
const accountValidator = require('./accountValidator')

module.exports = function({accountRepository}){
	return{
		getAllAccounts: function(callback){
			accountRepository.getAllAccounts(function(errors,accounts){
				callback(errors,accounts)
			})
		},

		getAccountByUsername: function(account, callback){
			accountRepository.getAccountByUsername(account,function(errors,account){
				callback(errors,account)
			})
		},

		getAccount: function(account, callback){
			accountRepository.getAccount(account,function(errors,account){
				callback(errors,accounts)
			})
		},

		createAccount: function(account, callback){
			// Validate the account.
			const error = accountValidator.getErrorsNewAccount(account)
			
			if(0 < error.length){
				callback(error, null)
				return
			}
			
			accountRepository.createAccount(account,function(errors,account){
				callback(errors,account)
			})
			
		}

	}

}

/*exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.getAccountByUsername = function(account, callback){
	accountRepository.getAccountByUsername(account, callback)
}

exports.getAccount = function(account, callback){
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
*/



