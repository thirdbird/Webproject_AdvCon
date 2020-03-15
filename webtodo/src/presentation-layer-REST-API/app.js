const express = require('express')
const bodyParser = require('body-parser')
const awilix = require('../main')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))



app.use('/blogPosts', awilix.theBlogsRouterAPI)
app.use('/accounts', awilix.theAccountRouterAPI)

app.listen(8080, function () {
	console.log('Web application API running on 8080')
})

