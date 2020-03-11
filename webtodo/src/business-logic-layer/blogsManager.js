

module.exports = function ({ blogsRepository, todoValidator }) {

    return {

        //Get all blogs

        //get blog post by id
        getBlogPostById: function (id, callback) {
            blogsRepository.getBlogPostById(id, callback)
        },

        //create a blog post
        createBlogPost: function (blogPost, callback) {
            const errors = todoValidator.blogErrors(blogPost)

            if (0 < errors.length) {
                callback(errors, null)
                return
            }

            blogsRepository.createBlogPost(blogPost, callback)
        },

        getAllBlogPosts: function (callback) {
            blogsRepository.getAllBlogPosts(callback)
        }
    }
}
