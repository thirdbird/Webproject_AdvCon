const awilix = require('awilix')

// Import the ones we want to use (real or mockup), real in this case.

//const accountRepository = require('./data-access-layer/accountRepository')//sql db
//const todoRepository = require('./data-access-layer/todoRepository')//sql db


const accountRepository = require('./data-access-layer-sequelize/accountRepository')//sequelize
const todoRepository = require('./data-access-layer-sequelize/todoRepository')//sequelize

//Sequelize Models
const accountModel = require('./data-access-layer-sequelize/accountModel')
const todoModel = require('./data-access-layer-sequelize/todoModel')

const accountValidator = require('./business-logic-layer/accountValidator')
const todoValidator = require('./business-logic-layer/todoValidator')

const accountManager = require('./business-logic-layer/accountManager')
const todoManager = require('./business-logic-layer/todoManager')

const accountRouter = require('./presentation-layer/routers/accountsRouter')
const todolistRouter = require('./presentation-layer/routers/todolistRouter')
const variousRouter = require('./presentation-layer/routers/variousRouter')

//API
const todolistRouterAPI = require('./presentation-layer-REST-API/todolistRouterAPI')
const accountsRouterAPI = require('./presentation-layer-REST-API/accountsRouterAPI')

// Create a container and add the dependencies we want to use.
const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("todoRepository", awilix.asFunction(todoRepository))

container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("todoValidator", awilix.asFunction(todoValidator))

container.register("accountManager", awilix.asFunction(accountManager))
container.register("todoManager", awilix.asFunction(todoManager))


container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("todolistRouter", awilix.asFunction(todolistRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))

//Models
container.register("accountModel", awilix.asFunction(accountModel))
container.register("todoModel", awilix.asFunction(todoModel))

//API
container.register("accountsRouterAPI", awilix.asFunction(accountsRouterAPI))
container.register("todolistRouterAPI", awilix.asFunction(todolistRouterAPI))


// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
const theTodolistRouter = container.resolve("todolistRouter")
const theVariousRouter = container.resolve("variousRouter")

const theAccountRouterAPI = container.resolve("accountsRouterAPI")
const theTodolistRouterAPI = container.resolve("todolistRouterAPI")

module.exports = {theAccountRouterAPI,theTodolistRouterAPI,theVariousRouter}
