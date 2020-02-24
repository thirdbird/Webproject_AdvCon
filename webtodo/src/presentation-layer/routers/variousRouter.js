const express = require('express')

const router = express.Router()

const redirectLogin = (request, response, next) => {
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
}

router.get('/', function(request, response){
	//create session object
	const{userId} = request.session
	if(request.session.key){
		response.render('home-logged-in.hbs', userId)
	} else {
		response.render('home.hbs')
	}
})

router.get('/about', function(request, response){
	response.render('about.hbs')
})

router.get('/contact', function(request, response){
	response.render('contact.hbs')
})

module.exports = router