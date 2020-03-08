const express = require('express')

module.exports = function ({ accountManager }) {

    const router = express.Router()

    router.get("/sign-up", function (request, response) {
		//response the sign up page
	})

	router.get("/sign-in", function (request, response) {
		//response the sign in page
	})

	router.get("/sign-out", function (request, response) {
		// response sign out page
	})

	router.get("/", function (request, response) {
        try {
            accountManager.getAllAccounts(function (errors, accounts) {
                const model = {
                    errors: errors,
                    accounts: accounts,
                }
                response.status(200).json(model)
            })
        } catch (error) {
           response.status(500).json({message: error}) 
        }
	})

	router.get('/:username', function (request, response) {

		const account = { username: request.params.username }
        try {
            accountManager.getAccountByUsername(account, function (errors, account) {
                const model = {
                    errors: errors,
                    accounts: account,
                }
                response.status(200).json(model)
            })
        } catch (error) { //TODO if username doesnt exist status code 404
            response.status(500).end()
        }
		
    })

    //POSTS
    
    router.post('/sign-up', function (request, response) {
		const account = {
			username: request.body.username,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        }
        try {
            accountManager.createAccount(account, function (errors, account) {
                const model = {
                    errors: errors,
                    account: account,
                }
                response.status(201).json(model)    
            })
        } catch (error) {
            response.status(500).end()
        }
    })

    router.post("/sign-in", function (request, response) {
		const account = {
			username: request.body.username,
			password: request.body.password
        }
        try {
            accountManager.getAccount(account, function (errors, account) {
                const model = {
                    errors: errors,
                    account: account,
                }
                response.status(200).json(model)
            })
        } catch (error) {
            response.status(500).json.end()
        }
    })
    

    //DELETE

    router.delete("/:username", function (request, response) {
		//delete username 
    })

    router.put("/:username", function (request, response) {
		//update username info 
    })

    
    return router

}