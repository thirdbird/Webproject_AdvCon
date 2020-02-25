const express = require('express')

const router = express.Router()

router.get('/', function(request,response){
    const model = {
        account: request.session.account,
		loggedIn: request.session.loggedIn 
	}
    response.render('todolist.hbs', model)
})

module.exports = router