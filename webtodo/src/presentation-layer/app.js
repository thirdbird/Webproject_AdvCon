const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const awilix = require('../main')
const session = require('express-session')
const redis = require('redis')
const bodyParser = require('body-parser')
const redisClient = redis.createClient({
	host: 'redis',
	port: 6379
})
const redisStore = require('connect-redis')(session)

const TWO_HOURS = 1000 * 60 * 60 * 2
const {
	SESS_NAME = 'onepunchman',
	SESS_SECRET = 'saitama',
	SESS_LIFETIME = TWO_HOURS
} = process.env

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

//Set up express-handlebars.
app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

//Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

//Enable session.
app.use(session({
	secret: SESS_SECRET,
	name: SESS_NAME,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: SESS_LIFETIME,
		secure: false
	},
	store: new redisStore({
		client: redisClient,
		tt1: 86400
	})
}))

//Enable hashing.
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))

//Attach all routers.
app.use('/', awilix.theVariousRouter)
app.use('/accounts', awilix.theAccountRouter)
app.use('/todolist', awilix.theTodolistRouter)
app.use('/blogPosts', awilix.theBlogsRouter)

app.use('/api/blogPosts', awilix.theBlogsRouterAPI)
app.use('/api/accounts', awilix.theAccountRouterAPI)


//Start listening for incoming HTTP requests!
app.listen(8080, function () {
	console.log('Web application running on 8080')
})

//Throw Redis error in case of ERROR.
redisClient.on('error', (err) => {
	console.log('Redis Error: ', err)
})
