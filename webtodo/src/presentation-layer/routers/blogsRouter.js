const express = require('express')

module.exports = function ({ blogsManager }) {

    const router = express.Router()

    //------------------GET REQUEST------------------//

    router.get('/', function (request, response) {
        blogsManager.getAllBlogPosts(function (errors, blogPosts) {
            const model = {
                errors: errors,
                blogPosts: blogPosts,
                account: request.session.account,
                loggedIn: request.session.loggedIn
            }
            if (errors.length != 0) {
                response.render("blogs-list-all.hbs", model)
            } else {
                response.render("blogs-list-all.hbs", model)
            }
        })
    })

    router.get('/create', function (request, response) {
        const model = {
            account: request.session.account,
            loggedIn: request.session.loggedIn,
        }
        response.render("createABlogPost.hbs", model)
    })

    router.get('/:id', function (request, response) {
        const blogPost = { id: request.params.id }

        blogsManager.getBlogPostById(blogPost, function (errors, blogPost) {
            const model = {
                errors: errors,
                blogPost: blogPost,
                account: request.session.account,
                loggedIn: request.session.loggedIn
            }
            response.render("blog-post-show-one.hbs", model)
        })
    })

    //------------------POST REQUEST------------------//

    router.post('/create', function (request, response) {
        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }
        const formHolder = {
            titleholder: request.body.title,
            postholder: request.body.post
        }

        const accountUser = request.session.account.username

        blogsManager.createBlogPost(blogPost, accountUser, function (errors, blogPost) {
            blogsManager.getAllBlogPosts(function (errors2, blogPosts) {
                const model = {
                    errors: errors,
                    errors2: errors2,
                    blogPost: blogPost,
                    blogPosts: blogPosts,
                    account: request.session.account,
                    loggedIn: request.session.loggedIn,
                    formHolder: formHolder
                }
                if (errors.length != 0) {
                    response.render("createABlogPost.hbs", model)
                } else {
                    model.formHolder = ""
                    response.render("blogs-list-all.hbs", model)
                }
            })
        })
    })

    return router
}
