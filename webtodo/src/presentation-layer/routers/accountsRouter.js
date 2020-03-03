const express = require('express')
//const accountManager = require('../../business-logic-layer/accountManager')

module.exports = function ({ accountManager }) {

	const router = express.Router()
	router.use(express.urlencoded({ extended: false }))


	//------------------GET REQUEST------------------//

	router.get("/sign-up", function (request, response) {
		response.render("accounts-sign-up.hbs")
	})

	router.get("/sign-in", function (request, response) {
		response.render("accounts-sign-in.hbs")
	})

	router.get("/sign-out", function (request, response) {
		request.session.destroy()
		response.redirect('/')
		console.log(session)
	})

	router.get("/", function (request, response) {
		accountManager.getAllAccounts(function (errors, accounts) {
			console.log(errors,accounts)
			const model = {
				errors: errors,
				accounts: accounts,
				account: request.session.account,
				loggedIn: request.session.loggedIn
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function (request, response) {

		const account = { username: request.params.username }

		accountManager.getAccountByUsername(account, function (errors, account) {
			const model = {
				errors: errors,
				account: request.session.account,
				loggedIn: request.session.loggedIn
			}
			response.render("accounts-show-one.hbs", model)
		})
	})

	
	//------------------POST REQUEST------------------//

	router.post('/sign-up', function (request, response) {
		const account = {
			username: request.body.username,
			password: request.body.password,
			confirmPassword: request.body.confirmPassword
		}
		const formHolder = {
			usernameholder: request.body.username
		}
		accountManager.createAccount(account, function (errors, account) {
			const model = {
				errors: errors,
				account: account,
				formHolder: formHolder
			}
			if (errors.length != 0) {
				response.render("accounts-sign-up.hbs", model)
			}
			else {
				response.render("accounts-sign-in.hbs")
			}
		})
	})

	router.post("/sign-in", function (request, response) {


		const account = {
			username: request.body.username,
			password: request.body.password
		}

		const formHolder = {
			usernameholder: request.body.username
		}
		console.log('session id:', request.session.userId) //undefined
		console.log('session string:', request.sessionID)	//string

		accountManager.getAccount(account, function (errors, account) {
			const model = {
				errors: errors,
				account: account,
				formHolder: formHolder
			}
			if (errors.length != 0) {
				response.render("accounts-sign-in.hbs", model)
			}
			else {
				model.loggedIn = true
				request.session.loggedIn = true
				request.session.userId = account.id
				request.session.account = account
				response.render("home-logged-in.hbs", model)
			}
		})
	})

	return router

}


//module.exports = router