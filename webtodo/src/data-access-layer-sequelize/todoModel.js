const Sequelize = require('sequelize')
const db = require('./db')

const Todos = db.define('todos', {
    todo: {
        type: Sequelize.TEXT
    }
      
})

module.exports = Todos