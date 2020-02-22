const express = require('express')
const accountManager = require('../../business-logic-layer/accountManager')

const router = express.Router()
router.use(express.urlencoded({extended: false}))


//------------------GET REQUEST------------------//

router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get("/", function(request, response){
	accountManager.getAllAccounts(function(errors, accounts){
		console.log(errors, accounts)
		const model = {
			errors: errors,
			accounts: accounts
		}
		response.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', function(request, response){
	
	const account = {username: request.params.username}
	
	accountManager.getAccountByUsername(account, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
	
})

//------------------POST REQUEST------------------//

router.post('/sign-up', function(request, response){
	const account = {
		username: request.body.username,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword
	}
	accountManager.createAccount(account, function(errors,account){
		const model = {
			errors: errors,
			account: account
		}
		if(errors.length !=0){
			response.render("accounts-sign-up.hbs", model)
		}
		else{
			response.render("accounts-sign-in.hbs")
		}
	})
})

router.post("/sign-in", function(request, response){

	//TODO catching and displaying errors
	const account = {
		username: request.body.username,
		password: request.body.password
	}
	accountManager.getAccount(account, function(errors,account){
		const model = {
			errors: errors,
			account: account
		}
		
		response.render("accounts-sign-in.hbs",model)
	})
	/*
	//logged in user, send key to redis.
	request.session.key = request.body.username
	response.end('done')
	*/
	
})

router.post('/sign-out', function(request, response){
	request.session.destroy(function(err){
		if(err){
			console.log(err)
		} else {
			response.redirect('/')
		}
	})
})

module.exports = router