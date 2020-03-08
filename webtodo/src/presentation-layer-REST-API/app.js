const express = require('express')
const bodyParser = require('body-parser')
//const jwt = require('jsonwebtoken')


//app.use(bodyParser.urlencoded({
//	extended: false
//}))

//Tokens

const awilix = require('../main')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/todolist', awilix.theTodolistRouterAPI)

//Start listening for incoming HTTP requests!
app.listen(8080, function () {
	console.log('Web application running on 8080')
})

