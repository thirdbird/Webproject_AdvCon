const express = require('express')

module.exports = function ({ blogsManager }) {

    const router = express.Router()

    router.use(express.urlencoded({ extended: false }))

    //get all blog post
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

    //get blog post
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

    return router
}
