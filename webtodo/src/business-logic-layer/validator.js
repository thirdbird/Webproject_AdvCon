const ZERO = 0
const MIN_TITLE_LENGTH = 10
const MAX_TODO_LENGTH = 42

module.exports = function ({ }) {

	return {
		todoErrors: function (todo) {
			const errors = []

			if (todo.length == ZERO) {
				errors.push("You have to enter a todo")
			}
			if (todo.length > MAX_TODO_LENGTH) {
				errors.push("The todo is too long")
			}

			return errors
		},

		blogErrors: function (blogPost) {
			const errors = []

			if (blogPost.title.length == ZERO) {
				errors.push("You have to enter a title")
			}
			else if (blogPost.title.length < MIN_TITLE_LENGTH) {
				errors.push("Your title is too short")
			}
			if (blogPost.post.length == ZERO) {
				errors.push("You have to write something")
			}

			return errors
		}
	}
}
