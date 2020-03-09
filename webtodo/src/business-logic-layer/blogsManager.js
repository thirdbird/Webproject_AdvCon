const blogsRepository = require('../data-access-layer-sequelize/blogsRepository')


module.exports = function ({ }) {

	return {
        
        //Get all blogs

        //get blog post by id
        getBlogPostById: function (id, callback) {
			blogsRepository.getBlogPostById(id, callback)
        },
        
        //create a blog post
        createBlogPost: function(blogPost,callback){
            blogsRepository.createBlogPost(blogPost,callback)
        }

        
	}
}
