
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