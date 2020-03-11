
module.exports = function ({ accountRepository, accountValidator }) {

	return {
		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function (account, callback) {
			accountRepository.getAccountByUsername(account, callback)
		},

		getAccount: function (account, callback) {
			accountRepository.getAccount(account, callback)
		},

		createAccount: function (account, callback) {
			// Validate the account.
			const error = accountValidator.getErrorsNewAccount(account)

			if (0 < error.length) {
				callback(error, null)
				return
			}

			accountRepository.createAccount(account, callback)
		},

		deleteAccount: function (account, callback) {
			accountRepository.deleteAccount(account, callback)
		},

		updateAccountbyId: function (account, callback) {


			const repo = accountRepository.getAccountByUsername(account, callback)
			console.log(repo)


			//accountRepository.updateAccountbyId(account,callback)
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



