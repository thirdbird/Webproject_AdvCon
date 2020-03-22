const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Accounts = db.define('accounts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },

    })

    Accounts.associate = (models) => {
        Accounts.hasMany(models.Todos, { as: "todos", foreignKey: "account_id" })
        Accounts.hasMany(models.Blogs, { as: "blogs", foreignKey: "account_user" })
    }

    return Accounts
}
