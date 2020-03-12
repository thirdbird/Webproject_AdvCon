const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Todos = db.define('todos', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        todo: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })

    return Todos
}