const express = require('express')
const accountManager = require('../../business-logic-layer/accountManager')
const session = require('express-session')
const redis = require('redis')
const redisClient = redis.createClient({
	host: 'redis',
	port: 6379
})
const redisStore = require('connect-redis')(session)

const router = express.Router()


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
	
	const username = request.params.username
	
	accountManager.getAccountByUsername(username, function(errors, account){
		const model = {
			errors: errors,
			account: account
		}
		response.render("accounts-show-one.hbs", model)
	})
	
})

router.post('/sign-up', function(request, response, next){
	request.check('username', 'Invalid username').accountManager.createAccount()
	request.check('password1', 'Password is Invalid').isLength({min:4}).equals(request.body.password2)

	var errors = request.validationErrors()
	if(errors){
		request.session.errors = errors
		request.session.success = false
	} else {
		request.session.success = true
	}
	response.redirect('/todolist')
})

module.exports = router