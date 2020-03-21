

module.exports = function ({ blogsRepository, validator }) {

    return {
        getBlogPostById: function (blogPost, callback) {
            blogsRepository.getBlogPostById(blogPost, callback)
        },

        createBlogPost: function (blogPost, accountUser, callback) {
            const errors = validator.blogErrors(blogPost)

            if (0 < errors.length) {
                callback(errors, null)
                return
            }

            blogsRepository.createBlogPost(blogPost, accountUser, callback)
        },

        getAllBlogPosts: function (callback) {
            blogsRepository.getAllBlogPosts(callback)
        },

        updateBlogPost: function (blogPost, accountUser, callback) {
            const errors = validator.blogErrors(blogPost)

            if (0 < errors.length) {
                callback(errors, null)
                return
            }

            blogsRepository.updateBlogPost(blogPost, accountUser, callback)
        },

        deleteBlogPost: function (id, callback) {
            blogsRepository.deleteBlogPost(id, callback)
        }
    }
}
