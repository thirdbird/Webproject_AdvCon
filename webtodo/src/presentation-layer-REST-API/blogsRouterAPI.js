//CRUD operation on todolist resource
const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = "sdfkjdslkfjslkfd"
const serverIdSecret = "eqjhrgbczvlkuyearjhbjhg"

module.exports = function ({ blogsManager }) {

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

    router.get('/', function (request, response) {
        blogsManager.getAllBlogPosts(function (errors, blogPosts) {
            if (0 < errors.length) {
                response.status(500).end()
            } else {
                response.status(200).json(blogPosts)
            }
        })

    })

    router.get('/:id', retrieveToken, function (request, response) {
        const blogPost = { id: request.params.id }
        blogsManager.getBlogPostById(blogPost, function (errors, blogPost) {
            if (0 < errors.length) {
                response.status(500).end()
            } else if (!blogPost) {
                response.status(404).end()
            } else {
                response.status(200).json(blogPost)
            }
        })

    })


    //TODO ACCOUNT USER FIX
    router.post('/', retrieveToken, function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
                const blogPost = {
                    title: request.body.title,
                    post: request.body.post
                }

                const accountUser = decoded.username

                blogsManager.createBlogPost(blogPost, accountUser, function (errors, blogPost) {
                    if (errors.includes("databaseError")) {
                        response.status(500).end()
                    } else if (0 < errors.length) {
                        response.status(400).json(errors)
                    } else {
                        response.setHeader("Location", "/blogPosts/" + blogPost.id)
                        response.status(201).end()
                    }

                })
            }
        })
    })

    //TODO ACCOUNT USER FIX
    router.put('/:id', retrieveToken, function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
                const blogPost = {
                    id: request.params.id,
                    title: request.body.title,
                    post: request.body.post
                }
                const accountUser = decoded.username

                console.log("from the rest api", blogPost)

                blogsManager.updateBlogPost(blogPost, accountUser, function (errors, blogPost) {
                    if (errors.includes("databaseError")) {
                        response.status(500).end()
                    }
                    else if (0 < errors.length) {
                        response.status(400).json(errors)
                    } else if (blogPost == 0) {
                        response.status(404).end()
                    } else {
                        response.status(204).end()
                    }
                })
            }
        })
    })

    router.delete('/:id', retrieveToken, function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
                const id = request.params.id

                blogsManager.deleteBlogPost(id, function (errors, blogPost) {
                    if (0 < errors.length) {
                        response.status(500).end()
                    } else if (blogPost == 0) {
                        response.status(404).end()
                    } else {
                        response.status(204).end()
                    }
                })
            }
        })
    })

    return router
}