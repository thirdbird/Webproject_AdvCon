const express = require('express')
const humansManager = require('../../business-logic-layer/humansManager')

const router = express.Router()

router.get('/', function(request, response){
	humansManager.getAllHumans(function(errors, humans){
		// TODO: Also handle errors.
		console.log(errors, humans)
		const model = {
			errors: errors,
			humans: humans
		}
		response.render('humans.hbs', model)
	})
	
})


module.exports = router