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
        accountManager.getAllAccounts(function(errors, accounts){
            if(0 < errors.length){
                response.status(500).end()
            }else{
                response.status(200).json(accounts)
            }
        })
	})

	router.get('/:username', function (request, response) {
		const account = { username: request.params.username }
        accountManager.getAccountByUsername(account, function(errors, account){
            if(0 < errors.length){
                response.status(500).end()
            }else if(!account){
                response.status(404).end()
            }else{
                response.status(200).json(account)
            }
        })
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
                if(0 < errors.length){
                    response.status(400).json(errors)
                }
                else{
                    response.setHeader("Location", "/accounts/"+account.username)
                    response.status(201).end()
                }
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
                if(0 < errors.length){
                    response.status(400).json(errors)
                }
                else{
                    response.status(200).json(account)
                }
            })
        } catch (error) {
            response.status(500).json.end()
        }
    })

    router.put("/:username", function(request,response){
        const account = {
            username: request.body.username
        }
        accountManager.updateAccountById(account,function(errors,accountExists){
            if(errors.includes("databaseError")){
                response.status(500).end()
            }else if(0 < errors.length){
                response.status(400).json(errors)
            }else if(!accountExists){
                response.status(404).end()
            }else{
                response.status(204).end()
            }
        })
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