const express = require('express')

const router = express.Router()

/*const redirectLogin = (request, response, next) => {
	if(!request.session.userId){
		response.redirect('/sign-in')
	}else{
		next()
	}
}

const redirectHome = (request, response, next) => {
	if(!request.session.userId){
		response.redirect('/')
	}else{
		next()
	}
}*/

router.get('/', function(request, response){

	let sess = request.session
	console.log(sess)
	if(sess.userId === undefined){
		response.render('home.hbs')
	}else{
		const account = {
			username: request.session.account.username
		}
		const model = {
			account: account,
			loggedIn: request.session.loggedIn 
		}
		console.log('home session:', request.session)
		console.log('home username:',model.account.username)
		response.render('home-logged-in.hbs', model)
	}
})

router.get('/about', function(request, response){
	const model = {
		account: request.session.account,
		loggedIn: request.session.loggedIn 
	}
	response.render('about.hbs', model)
})

router.get('/contact', function(request, response){
	const model = {
		account: request.session.account,
		loggedIn: request.session.loggedIn 
	}
	response.render('contact.hbs', model)
})

module.exports = router