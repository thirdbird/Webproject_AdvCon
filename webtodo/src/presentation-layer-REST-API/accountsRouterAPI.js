const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = "sdfkjdslkfjslkfd"

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

    router.get("/", verifyToken, function (request, response) {
        accountManager.getAllAccounts(function (errors, accounts) {
            if (0 < errors.length) {
                response.status(500).end()
            } else {
                response.status(200).json(accounts)
            }
        })
    })

    router.get('/:username', function (request, response) {
        const account = { username: request.params.username }
        accountManager.getAccountByUsername(account, function (errors, account) {
            if (0 < errors.length) {
                response.status(500).end()
            } else if (!account) {
                response.status(404).end()
            } else {
                response.status(200).json(account.username)
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
                if (0 < errors.length) {
                    response.status(400).json(errors)
                }
                else {
                    response.setHeader("Location", "/accounts/" + account.id)
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
                if (0 < errors.length) {
                    response.status(400).json(errors)
                } else {
                    jwt.sign({ account }, serverSecret, (err, token) => {
                        if (err) {
                            response.status(500).json(err)
                        } else {
                            response.status(200).json({ token, account })
                        }
                    })
                }
            })
        } catch (errors) {
            response.status(500).json.end()
        }
    })

    router.put("/:username", function (request, response) {
        const account = {
            username: request.body.username
        }
        accountManager.updateAccountById(account, function (errors, accountExists) {
            if (errors.includes("databaseError")) {
                response.status(500).end()
            } else if (0 < errors.length) {
                response.status(400).json(errors)
            } else if (!accountExists) {
                response.status(404).end()
            } else {
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


    function verifyToken(request, response, next) {
        const authorizationHeader = request.get('authorization')
        const accessToken = authorizationHeader.substr("Bearer ".length)
        if(typeof authorizationHeader !== 'undefined'){
            response.status(200).json(accessToken)
            next()
        } else {
            response.status(403).end()
        }
    }

    return router

}