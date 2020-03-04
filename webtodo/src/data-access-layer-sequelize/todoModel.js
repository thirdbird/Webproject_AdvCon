const Sequelize = require('sequelize')
const db = require('./db')

const Todos = db.define('todos', {
    todo: Sequelize.TEXT,
})

module.exports = Todos