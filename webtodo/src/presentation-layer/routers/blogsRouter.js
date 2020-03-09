const express = require('express')
const blogsManager = require('../../business-logic-layer/blogsManager')

module.exports = function ({ }) {

    const router = express.Router()
    
    router.get('/', function (request, response) {
        response.render('blogs.hbs')
    })

    //read blog post
    router.get('/:id', function(request,response){
        const id = request.params.id

        blogsManager.getBlogPostById(id,function(errors,blogPost){
            const model = {
                errors: errors,
                blogPost: blogPost
            }
            response.render("blog-post-show-one", model)
        })
    })
    
    //create blog
    router.post('/', function(request,response){

        const blogPost = {
            title: request.body.title,
            post: request.body.post
        }
        blogsManager.createBlogPost(blogPost,function(errors,blogPost){
            blogsManager.getAllBlogPosts(function(errors2,blogPosts){
                const model = {
                    errors: errors,
                    errors2: errors2,
                    blogPosts: blogPosts,
                    blogPost: blogPost
                }
                if(errors.length != 0){
                response.render("blogs.hbs",model)
                }else{
                response.render("blogs.hbs",model)
                }
            })
        })


    })
    
	return router
}
