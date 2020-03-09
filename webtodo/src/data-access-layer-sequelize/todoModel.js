const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Todos = db.define('todos', {
        todo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
        {
            indexes: [
                //{ fields: ['todo'], unique: true }
            ]
        })

    return Todos
}