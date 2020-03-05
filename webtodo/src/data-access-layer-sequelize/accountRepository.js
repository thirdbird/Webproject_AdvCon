const accountModel = require('./accountModel')

module.exports = function ({ }) {

	return {

		getAllAccounts: function (callback) {
			accountModel.findAll({ raw: true })
				.then(function (accounts) {
					callback([], accounts)

				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		getAccountByUsername: function (account, callback) {
			accountModel.findOne({ where: { username: account.username }, raw: true })
				.then(function (accounts) {
					callback([], accounts)
					console.log("inside from the repo", accounts)

				})
				.catch(function (error) {
					callback[error], null
				})
		},

		getAccount: function (account, callback) {
			accountModel.findOne({ where: { username: account.username, password: account.password }, raw: true })
				.then(function (accounts) {
					callback([], accounts)
				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		createAccount: function (account, callback) {
			accountModel.create({ username: account.username, password: account.password })
				.then(function (createdAccount) { callback([], createdAccount) })
				.catch(function (error) { callback([error], null) })
		}

	}
}
