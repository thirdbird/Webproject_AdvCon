
module.exports = function ({ accountModel }) {

	return {

		getAllAccounts: function (callback) {
			accountModel.findAll({ raw: true })
				.then(function (accounts) {
					callback([], accounts)
				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		getAccountByUsername: function (account, callback) {
			accountModel.findOne({ where: { username: account.username }, raw: true })
				.then(function (account) {
					callback([], account)
				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		getAccount: function (account, callback) {
			accountModel.findOne({ where: { username: account.username, password: account.password }, raw: true })
				.then(function (loggedAccount) {
					callback([], loggedAccount)
				})
				.catch(function () {
					callback(["Username or password doesn't match"], null)
				})
		},

		createAccount: function (account, callback) {
			accountModel.create({ username: account.username, password: account.password })
				.then(function (createdAccount) {
					callback([], createdAccount)
				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		deleteAccount: function (account, callback) {
			accountModel.destroy({
				where: { username: account.username }
					.then(function (deleteAccount) {
						callback([], deleteAccount)
					})
					.catch(function (error) {
						callback(["databaseError"], null)
					})
			})
		},

		updateAccountbyId: function (account, callback) {
			accountModel.findOne({
				where: { username: account.username }
					.then()
			})
		}
	}
}
