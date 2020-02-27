const awilix = require('awilix')

// Import the ones we want to use (real or mockup), real in this case.
const accountRepository = require('data-access-layer/accountRepository')
const todoRepository = require('data-access-layer/todoRepository')
const dbConnection = require('data-access-layer/db')
const accountManager = require('business-logic-layer/accountManager')
const accountValidator = require('business-logic-layer/accountValidator')
const todoManager = require('business-logic-layer/todoManager')
const todoValidator = require('business-logic-layer/todoValidator')
const accountRouter = require('presentation-layer/accountRouter')
const todolistRouter = require('presentation-layer/todolistRouter')
const variousRouter = require('presentation-layer/variousRouter')

// Create a container and add the dependencies we want to use.
const container = awilix.createContainer()
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("dbConnection", awilix.asFunction(dbConnection))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("todoManager", awilix.asFunction(todoManager))
container.register("todoValidator", awilix.asFunction(todoValidator))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("todolistRouter", awilix.asFunction(todolistRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))

// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")
const theTodolistRouter = container.resolve("todolistRouter")
const theVariousRouter = container.resolve("variousRouter")
