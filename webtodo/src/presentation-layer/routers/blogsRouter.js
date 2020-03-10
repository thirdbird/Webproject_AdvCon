const express = require('express')

module.exports = function ({ blogsManager }) {

    const router = express.Router()

    router.use(express.urlencoded({ extended: false }))

    router.get('/', function (request, response) {
        blogsManager.getAllBlogPosts(function(errors,blogPosts){
            const model = {
                errors: errors,
                blogPosts: blogPosts,
            }
            if (errors.length != 0) {
                response.render("blogs.hbs", model)
            } else {
                response.render("blogs.hbs", model)
            }
        })
    })

    //read blog post
    router.get('/:id', function (request, response) {
        const id = request.params.id

        blogsManager.getBlogPostById(id, function (errors, blogPost) {
            const model = {
                errors: errors,
                blogPost: blogPost
            }
            console.log(model)
            response.render("blog-post-show-one", model)
        })
    })

    //create blog
    router.post('/', function (request, response) {

        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }
        blogsManager.createBlogPost(blogPost, function (errors, blogPost) {
            blogsManager.getAllBlogPosts(function (errors2, blogPosts) {
                const model = {
                    errors: errors,
                    errors2: errors2,
                    blogPosts: blogPosts,
                }
                if (errors.length != 0) {
                    response.render("blogs.hbs", model)
                } else {
                    console.log(model)
                    response.render("blogs.hbs", model)
                }
            })
        })


    })

    return router
}
