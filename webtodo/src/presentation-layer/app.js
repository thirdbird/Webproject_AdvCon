const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const variousRouter = require('./routers/variousRouter')
const humansRouter = require('./routers/humansRouter')

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

//Attach all routers.
app.use('/', variousRouter)
app.use('/humans', humansRouter)

//Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Web application running on 8080')
})