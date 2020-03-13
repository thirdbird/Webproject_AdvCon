//CRUD operation on todolist resource
const express = require('express')
const jwt = require('jsonwebtoken')
const serverSecret = "sdfkjdslkfjslkfd"
const serverIdSecret = "eqjhrgbczvlkuyearjhbjhg"

module.exports = function ({ blogsManager, accountManager }) {

    const router = express.Router()

    function retrieveToken(request, response, next) {
        const authorizationHeader = request.get('authorization')
        if (typeof authorizationHeader !== 'undefined') {
            const accessToken = authorizationHeader.substr("Bearer ".length)
            request.token = accessToken
            next()
        } else {
            response.sendStatus(403)
        }
    }

    router.get('/', retrieveToken, function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
                blogsManager.getAllBlogPosts(function (errors, blogPosts) {
                    if (0 < errors.length) {
                        response.status(500).end()
                    } else {
                        response.status(200).json(blogPosts)
                    }
                })
            }
        })
    })

    router.get('/:id', function (request, response) {
        jwt.verify(request.token, serverSecret, function (error, decoded) {
            if (error) {
                response.sendStatus(403)
            } else {
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
            }
        })
    })


    //TODO ACCOUNT USER FIX
    router.post('/', function (request, response) {

        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }

        const accountUser = "Alice"

        blogsManager.createBlogPost(blogPost, accountUser, function (errors, blogPost) {
            blogsManager.getAllBlogPosts(function (errors2, blogPosts) {
                if (errors.includes("databaseError")) {
                    response.status(500).end()
                } else if (0 < errors.length || 0 < errors2.length) {
                    response.status(400).json(blogPosts)
                } else {
                    response.setHeader("Location", "/blogs/" + blogPost.id)
                    response.status(201).end()
                }
            })
        })

    })

    //TODO ACCOUNT USER FIX
    router.put('/:id', function (request, response) {
        const blogPost = {
            id: request.params.id,
            title: request.body.title,
            post: request.body.post
        }
        const accountUser = request.body.accountUser

        try {
            blogsManager.updateBlogPost(blogPost, accountUser, function (errors, blogPost) {
                if (0 < errors.length) {
                    response.status(400).json(errors)
                } else if (blogPost == 0) {
                    response.status(404).end()
                } else {
                    response.status(204).end()
                }
            })
        } catch{
            response.status(500).end()
        }
    })

    router.delete('/:id', function (request, response) {
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
    })

    return router
}