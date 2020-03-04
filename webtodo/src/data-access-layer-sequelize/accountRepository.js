const accountModel = require('./accountModel')


module.exports = function ({ }) {

	return {

		getAllAccounts: function (callback) {
			accountModel.findAll()
				.then(function(accounts){callback([],accounts)})
				.catch(function(error){callback([error],null)})
		},

		getAccountByUsername: function(account,callback){
			accountModel.findAll({where: {username: account.username}})
			.then(function(accounts){callback([], accounts[0])})
			.catch(function(error){callback[error],null})
		},

		getAccount: function(account,callback){
			accountModel.findAll({where: {username: account.username, password: account.password}})
			.then(function(accounts){callback([],accounts[0])})
			.catch(function(error){callback([error],null)})	
		},

		createAccount: function(account,callback){
			accountModel.create({username: account.username,password: account.password})
			.then(function(createdAccount){callback([], createdAccount)})
			.catch(function(error){callback([error], null)})
		}

	}
}
