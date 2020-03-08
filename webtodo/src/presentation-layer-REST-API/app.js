const express = require('express')
const bodyParser = require('body-parser')
//const jwt = require('jsonwebtoken')

//Tokens

const awilix = require('../main')
const app = express()


app.use(bodyParser.json())


app.use('/todolist', awilix.theTodolistRouterAPI)
app.use('/accounts', awilix.theAccountRouterAPI)

app.listen(8080, function () {
	console.log('Web application running on 8080')
})

