
module.exports = function ({ blogsModel }) {

	return {

		getAllBlogPosts: function (callback) {
			blogsModel.findAll({ raw: true })
				.then(function (blogPosts) {
					callback([], blogPosts)

				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		getBlogPostById: function (id, callback) {
			blogsModel.findOne({ where: { id: id.id }, raw: true })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		createBlogPost: function (blogPost, accountUser, callback) {
			blogsModel.create({ title: blogPost.title, post: blogPost.post, account_user: accountUser })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback(["databaseError"], null)
				})
		},

		updateBlogPost: function (blogPost, accountUser, callback) {
			blogsModel.update({ title: blogPost.title, post: blogPost.post, account_user: accountUser }, { where: { id: blogPost.id } })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function () {
					callback(["databaseError"])
				})
		},

		deleteBlogPost: function (id, callback) {
			blogsModel.destroy({ where: { id: id } })
				.then(function (deleteBlogPost) {
					callback([], deleteBlogPost)
				})
		}
	}
}
