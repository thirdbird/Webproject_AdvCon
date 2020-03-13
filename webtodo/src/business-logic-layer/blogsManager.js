

module.exports = function ({ blogsRepository, todoValidator }) {

    return {

        //Get all blogs

        //get blog post by id
        getBlogPostById: function (blogPost,callback) {
            blogsRepository.getBlogPostById(blogPost, callback)
        },

        //create a blog post
        createBlogPost: function (blogPost,accountUser, callback) {
            const errors = todoValidator.blogErrors(blogPost)

            if (0 < errors.length) {
                callback(errors, null)
                return
            }

            blogsRepository.createBlogPost(blogPost,accountUser, callback)
        },

        getAllBlogPosts: function (callback) {
            blogsRepository.getAllBlogPosts(callback)
        },

        updateBlogPost: function (blogPost,accountUser, callback) {
			blogsRepository.updateBlogPost(blogPost,accountUser, callback)
		},

		deleteBlogPost: function (id, callback) {
			blogsRepository.deleteBlogPost(id, callback)
		}
    }
}
