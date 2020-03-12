const express = require('express')

module.exports = function ({ blogsManager }) {

    const router = express.Router()

    router.use(express.urlencoded({ extended: false }))

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

    //read blog post
    router.get('/:id', function (request, response) {
        const blogPost = { id: request.params.id }

        blogsManager.getBlogPostById(blogPost, function (errors, blogPost) {
            const model = {
                errors: errors,
                blogPost: blogPost,
                account: request.session.account,
                loggedIn: request.session.loggedIn
            }
            console.log(blogPost)
            response.render("blog-post-show-one.hbs", model)
        })
    })

    //create blog
    router.post('/', function (request, response) {
        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }
        const formHolder = {
            titleholder: request.body.title,
            postholder: request.body.post
        }

        const auth = {
            account: request.session.account,
            loggedIn: request.session.loggedIn
        }

        if (auth.loggedIn) {
            const accountUser = auth.account.username
            blogsManager.createBlogPost(blogPost,accountUser, function (errors, blogPost) {
                blogsManager.getAllBlogPosts(function (errors2, blogPosts) {
                    const model = {
                        errors: errors,
                        errors2: errors2,
                        blogPosts: blogPosts,
                        account: request.session.account,
                        loggedIn: request.session.loggedIn,
                        formHolder: formHolder
                    }
                    if (errors.length != 0) {
                        response.render("blogs-list-all.hbs", model)
                    } else {
                        model.formHolder = ""
                        response.render("blogs-list-all.hbs", model)
                    }
                })
            })
        } else {
            blogsManager.getAllBlogPosts(function (errors, blogPosts) {
                const model = {
                    errors: ["You have to be logged in to write a post"],
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
        }
    })

    return router
}
