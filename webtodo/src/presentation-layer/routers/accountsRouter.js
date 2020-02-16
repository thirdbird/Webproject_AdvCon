const express = require('express')

const router = express.Router()


router.get("/sign-up", function(request, response){
	response.render("accounts-sign-up.hbs")
})

router.get("/sign-in", function(request, response){
	response.render("accounts-sign-in.hbs")
})

router.get("/", function(request, response){
	response.render("accounts.hbs")
})

module.exports = router