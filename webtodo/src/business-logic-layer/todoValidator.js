
exports.checkErrors = function(todo){
    const errors = []

	if(todo.length == 0){
		errors.push("You have to enter a todo")
	}
	
	return errors
}