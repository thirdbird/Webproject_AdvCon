
module.exports = function ({ }) {

	return {
		todoErrors: function (todo) {
			const errors = []

			if (todo.length == 0) {
				errors.push("You have to enter a todo")
			}
			if(todo.length > 42){
				errors.push("The todo is too long")
			}

			return errors
		},
	
		blogErrors: function (blogPost) {
			const errors = []

			if(blogPost.title.length == 0){
				errors.push("You have to enter a title")
			}
			else if(blogPost.title.length < 10){
				errors.push("Your title is too short")
			}
			if(blogPost.post.length == 0){
				errors.push("You have to write something")
			}

			return errors
		}
	}
}

/*exports.checkErrors = function(todo){
    const errors = []

	if(todo.length == 0){
		errors.push("You have to enter a todo")
	}

	return errors
}*/