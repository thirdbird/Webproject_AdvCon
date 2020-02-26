const awilix = require('awilix')

// Import the ones we want to use (real or mockup), real in this case.
const accountRepository = require('data-access-layer/account-repository')
const accountManager = require('business-logic-layer/account-manager')
const accountRouter = require('presentation-layer/account-router')

// Create a container and add the dependencies we want to use.
const container = awilix.createContainer()
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

// Retrieve the router, which resolves all other dependencies.
const theAccountRouter = container.resolve("accountRouter")