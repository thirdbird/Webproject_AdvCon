const express = require('express')
const bodyParser = require('body-parser')
const awilix = require('../main')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(function(request, response, next){
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
	response.setHeader("Access-Control-Allow-Methods", "*")
	response.setHeader("Access-Control-Allow-Headers", "Authorization Content-Type")
	response.setHeader("Access-Control-Expose-Headers", "Authorization Content-Type")
	next()
})

app.use('/blogPosts', awilix.theBlogsRouterAPI)
app.use('/accounts', awilix.theAccountRouterAPI)

app.listen(8080, function () {
	console.log('Web backend application API running on 8080')
})

