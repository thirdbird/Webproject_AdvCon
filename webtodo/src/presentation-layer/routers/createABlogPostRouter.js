const express = require('express')

module.exports = function ({ blogsManager }) {

    const router = express.Router()

    router.use(express.urlencoded({ extended: false }))

    //get all blog post
    router.get('/', function (request, response) {
        const model = {
            account: request.session.account,
            loggedIn: request.session.loggedIn,
        }
        response.render("createABlogPost.hbs", model)
    })

    //create blog post
    router.post('/', function (request, response) {
        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }
        const formHolder = {
            titleholder: request.body.title,
            postholder: request.body.post
        }

        const accountUser = request.session.account.username

        blogsManager.createBlogPost(blogPost,accountUser, function (errors, blogPost) {
                const model = {
                    errors: errors,
                    blogPost: blogPost,
                    account: request.session.account,
                    loggedIn: request.session.loggedIn,
                    formHolder: formHolder
                }
                if (errors.length != 0) {
                    response.render("createABlogPost.hbs", model)
                } else {
                    model.formHolder = ""
                    response.render("createABlogPost.hbs", model)
                }
            
        })
    })

    return router
}
