const Sequelize = require('sequelize')
const sequelize = require('./db')

const Accounts = sequelize.define('accounts',{
    username: Sequelize.TEXT,
    password: Sequelize.TEXT
})

Accounts.create({username: "Alice", password: "123"})
    .then(function(createdAccount){})
    .catch(function(error){})

const Todos = sequelize.define('todos',{
    todo: Sequelize.TEXT
})

module.exports = Accounts