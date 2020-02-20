const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const session = require('express-session')
const redis = require('redis')

const variousRouter = require('./routers/variousRouter')
const todolistRouter = require('./routers/todolistRouter')
const accountRouter = require('./routers/accountsRouter')

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

//Set up express-handlebars.
app.set('views', path.join(__dirname, 'views'))
//app.set('views", "src/presentation-layer/views')

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
	saveUninitialized: false,
	cookie: {
		maxAge: SESS_LIFETIME,
		sameSite: true,
		secure: false
	},
	store: new redisStore({
		client: redisClient,
		tt1: 86400
	})
}))

//Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/todolist', todolistRouter)

//Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Web application running on 8080')
})



redisClient.on('error', (err) => {
	console.log('Redis Error: ', err)
})

