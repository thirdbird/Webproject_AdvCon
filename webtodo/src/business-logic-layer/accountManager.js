
module.exports = function ({ accountRepository, accountValidator }) {

	return {
		getAllAccounts: function (callback) {
			accountRepository.getAllAccounts(callback)
		},

		getAccountByUsername: function (account, callback) {
			accountRepository.getAccountByUsername(account, callback)
		},

		getAccount: function (account, callback) {
			const error = accountValidator.getErrorsNewAccount(account)

			if (0 < error.length) {
				callback(error, null)
				return
			}
			accountRepository.getAccount(account, callback)
		},

		createAccount: function (account, callback) {
			const error = accountValidator.getErrorsNewAccount(account)

			if (0 < error.length) {
				callback(error, null)
				return
			}

			accountRepository.createAccount(account, callback)
		},

	}
}



