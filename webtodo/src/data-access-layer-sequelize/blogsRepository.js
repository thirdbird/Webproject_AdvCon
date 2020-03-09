const blogsModel = require('./blogsModel')

module.exports = function ({  }) {

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
			blogsModel.findOne({ where: { id: id }, raw: true })
				.then(function (blogPost) {
					callback([], blogPost)
				})
				.catch(function (error) {
					callback([error], null)
				})
        },
        
        createBlogPost: function(blogPost, callback){
            blogsModel.create({title: blogPost.title, post: blogPost.post})
                .then(function(blogPost){
                    callback([], blogPost)
                })
                .catch(function(error){
                    callback([error], null)
                })
        }

    }
}
