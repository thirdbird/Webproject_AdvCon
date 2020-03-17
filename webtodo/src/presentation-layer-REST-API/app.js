const express = require('express')
const bodyParser = require('body-parser')
const awilix = require('../main')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(function(request, response, next){
	response.setHeader("Access-Control-Allow-Origin", "*")
	response.setHeader("Access-Control-Allow-Methods", "*")
	response.setHeader("Access-Control-Allow-Headers", "*")
	response.setHeader("Access-Control-Expose-Headers", "*")
	next()
})

app.use('/blogPosts', awilix.theBlogsRouterAPI)
app.use('/accounts', awilix.theAccountRouterAPI)

app.listen(8080, function () {
	console.log('Web backend application API running on 8080')
})

