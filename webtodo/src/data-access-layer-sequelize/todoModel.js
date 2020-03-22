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
        },
        account_id: {
            type: Sequelize.INTEGER,
            references: {         
                model: 'accounts',
                key: 'id'
            }
        }
    })


    Todos.associate = (models) => {
        Todos.belongsTo(models.Accounts, { as: "accounts", foreignKey: "account_id" })
    }

    return Todos
}