const express = require('express')

const router = express.Router()

router.get('/', function(request, response){
	//create session object
	if(request.session.key){
		response.render('home-logged-in.hbs')
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