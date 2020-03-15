const awilix = require('awilix')

// Import the ones we want to use (real or mockup), real in this case.

//Validators
const accountValidator = require('./business-logic-layer/accountValidator')
const todoValidator = require('./business-logic-layer/todoValidator')

//Managers
const accountManager = require('./business-logic-layer/accountManager')
const todoManager = require('./business-logic-layer/todoManager')
const blogsManager = require('./business-logic-layer/blogsManager')

//SQL repositories
//const accountRepository = require('./data-access-layer/accountRepository')
//const todoRepository = require('./data-access-layer/todoRepository')
//const blogsRepository = require('./data-access-layer/blogsRepository')

//Sequelize repositories
const accountRepository = require('./data-access-layer-sequelize/accountRepository')
const todoRepository = require('./data-access-layer-sequelize/todoRepository')
const blogsRepository = require('./data-access-layer-sequelize/blogsRepository')

//Routers
const accountRouter = require('./presentation-layer/routers/accountsRouter')
const todolistRouter = require('./presentation-layer/routers/todolistRouter')
const variousRouter = require('./presentation-layer/routers/variousRouter')
const blogsRouter = require('./presentation-layer/routers/blogsRouter')
const createABlogPostRouter = require('./presentation-layer/routers/createABlogPostRouter')

//Models
const accountModel = require('./data-access-layer-sequelize/accountModel')
const todoModel = require('./data-access-layer-sequelize/todoModel')
const blogsModel = require('./data-access-layer-sequelize/blogsModel')

//API routers
const accountsRouterAPI = require('./presentation-layer-REST-API/accountsRouterAPI')
const blogsRouterAPI = require('./presentation-layer-REST-API/blogsRouterAPI')

// Create a container and add the dependencies we want to use.
const container = awilix.createContainer()

container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("todoValidator", awilix.asFunction(todoValidator))

container.register("accountManager", awilix.asFunction(accountManager))
container.register("todoManager", awilix.asFunction(todoManager))
container.register("blogsManager", awilix.asFunction(blogsManager))

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("blogsRepository", awilix.asFunction(blogsRepository))

container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("todolistRouter", awilix.asFunction(todolistRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("blogsRouter", awilix.asFunction(blogsRouter))
container.register("createABlogPostRouter", awilix.asFunction(createABlogPostRouter))

//Models
container.register("accountModel", awilix.asFunction(accountModel))
container.register("todoModel", awilix.asFunction(todoModel))
container.register("blogsModel", awilix.asFunction(blogsModel))

//API
container.register("accountsRouterAPI", awilix.asFunction(accountsRouterAPI))
container.register("blogsRouterAPI", awilix.asFunction(blogsRouterAPI))


// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
const theTodolistRouter = container.resolve("todolistRouter")
const theVariousRouter = container.resolve("variousRouter")
const theBlogsRouter = container.resolve("blogsRouter")
const theCreateABlogPostRouter = container.resolve("createABlogPostRouter")

const theAccountRouterAPI = container.resolve("accountsRouterAPI")
const theBlogsRouterAPI = container.resolve("blogsRouterAPI")

module.exports = {theAccountRouter,theTodolistRouter,theVariousRouter, theBlogsRouter,theCreateABlogPostRouter}
