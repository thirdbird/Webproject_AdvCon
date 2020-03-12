const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Accounts = db.define('accounts', {
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })

    return Accounts
}

/*,
        {
            indexes: [
                { fields: ['username'], unique: true }
            ]
        })*/