
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

		createBlogPost: function (blogPost,accountUser, callback) {
			blogsModel.create({ title: blogPost.title, post: blogPost.post, account_user: accountUser })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback([error], null)
				})
		},

		updateTodoById: function (blogPost,accountUser, callback) {
            blogsModel.update({ title: blogPost.title, post: blogPost.post, account_user: accountUser }, { where: { id: blogPost.id } })
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
