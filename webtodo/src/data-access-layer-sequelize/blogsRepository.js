
module.exports = function ({ blogsModel }) {

	return {

		getAllBlogPosts: function (callback) {
			blogsModel.findAll({ raw: true })
				.then(function (blogPosts) {
					callback([], blogPosts)

				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		getBlogPostById: function (id, callback) {
			blogsModel.findOne({ where: { id: id.id }, raw: true })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		createBlogPost: function (blogPost, callback) {
			blogsModel.create({ title: blogPost.title, post: blogPost.post })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		updateTodoById: function (blogPost, callback) {
            blogsModel.update({ title: blogPost.title, post: blogPost.post }, { where: { id: blogPost.id } })
                .then(function (blogPost) {
                    callback([], blogPost)
                })
                .catch(function (error) {
                    callback([error])
                })
        },

        deleteTodo: function (id, callback) {
            blogsModel.destroy({ where: { id: id } })
                .then(function (deleteBlogPost) {
                    callback([], deleteBlogPost)
                })
        }
	}
}
