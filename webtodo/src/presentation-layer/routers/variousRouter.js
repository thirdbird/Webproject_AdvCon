const express = require('express')

const router = express.Router()

router.get('/', function(request, response){
	response.render('home.hbs')
})

router.get('/', function(request, response){
	response.render('todolist.hbs')
})


module.exports = router