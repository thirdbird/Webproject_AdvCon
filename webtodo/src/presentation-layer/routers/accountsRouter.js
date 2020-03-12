const express = require('express')

module.exports = function ({ accountManager }) {

	const router = express.Router()

	router.use(express.urlencoded({ extended: false }))


	//------------------GET REQUEST------------------//

	router.get("/sign-up", function (request, response) {
		const auth = {
            errors: ["You have to be logged in to see this"],
            account: request.session.account,
            loggedIn: request.session.loggedIn
		}
		if(auth.loggedIn){
			response.render("home.hbs",auth)
		}else{
			response.render("accounts-sign-up.hbs")
		}
	})

	router.get("/sign-in", function (request, response) {
		const auth = {
            errors: ["You have to be logged in to see this"],
            account: request.session.account,
            loggedIn: request.session.loggedIn
		}
		if(auth.loggedIn){
			response.render("home.hbs", auth)
		}else{
			response.render("accounts-sign-in.hbs")
		}
	})

	router.get("/sign-out", function (request, response) {
		request.session.destroy()
		response.redirect('/')
	})

	router.get("/", function (request, response) {
		const auth = {
            errors: ["You have to be logged in to see this"],
            account: request.session.account,
            loggedIn: request.session.loggedIn
		}
		if(auth.loggedIn){
			accountManager.getAllAccounts(function (errors, accounts) {
				const model = {
					errors: errors,
					accounts: accounts,
					account: request.session.account,
					loggedIn: request.session.loggedIn
				}
				response.render("accounts-list-all.hbs", model)
			})
		}else{
			response.render("accounts-list-all.hbs",auth)
		}
	})

	router.get('/:username', function (request, response) {
		const account = { username: request.params.username }

		const auth = {
            errors: ["You have to be logged in to see this"],
            account: request.session.account,
            loggedIn: request.session.loggedIn
		}
		if(auth.loggedIn){
			accountManager.getAccountByUsername(account, function (errors, account) {
				const model = {
					errors: errors,
					accounts: account,
					account: request.session.account,
					loggedIn: request.session.loggedIn
				}
				response.render("accounts-show-one.hbs", model)
			})
		}else{
			response.render("accounts-show-one.hbs", auth)
		}
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
				console.log('HEUHEUHEUHEUHEUE', account.id)
				model.loggedIn = true
				request.session.loggedIn = true
				console.log("we are under true loggedin")
				request.session.userId = account.id
				request.session.account = account
				response.render("home-logged-in.hbs", model)
				console.log("bottom of else")
			}
		})
		
	})

	return router

}

