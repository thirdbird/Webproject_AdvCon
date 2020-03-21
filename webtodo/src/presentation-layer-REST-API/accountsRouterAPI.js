const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = "sdfkjdslkfjslkfd"
const serverIdSecret = "eqjhrgbczvlkuyearjhbjhg"

module.exports = function ({ accountManager }) {

    const router = express.Router()

    function retrieveToken(request, response, next) {
        const authorizationHeader = request.get('Authorization')
        if (typeof authorizationHeader !== 'undefined') {
            const accessToken = authorizationHeader.substr("Bearer ".length)
            request.token = accessToken
            next()
        } else {
            response.sendStatus(403)
        }
    }


    router.get("/", retrieveToken, function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
                accountManager.getAllAccounts(function (errors, accounts) {
                    if (0 < errors.length) {
                        response.status(500).end()
                    } else {
                        response.status(200).json(accounts)
                    }
                })
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

    router.post('/tokens/create', function (request, response) {
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

    router.post("/tokens", function (request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        try {
            accountManager.getAccount(account, function (errors, account) {
                if (0 < errors.length) {
                    response.status(400).json(errors)
                } else {
                    jwt.sign({ userId: account.id, username: account.username }, serverIdSecret, { expiresIn: '10min' }, function (errorId, idToken) {
                        jwt.sign({ id: account.id, username: account.username }, serverSecret, { expiresIn: '10min' }, function (errorAccess, accessToken) {
                            if (errorId) {
                                response.status(500).json(errorId)
                            } else if (errorAccess) {
                                response.status(500).json(errorAccess)
                            } else {
                                response.status(200).json({ accessToken, idToken })
                            }
                        })
                    })
                }
            })
        } catch (errors) {
            response.status(500).json.end()
        }
    })

    return router

}