const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Accounts = db.define('accounts', {
        username: {
            type: Sequelize.TEXT,
            allowNull: false
            //unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
        {
            indexes: [
                //{ fields: ['username'], unique: true }
            ]
        })

    return Accounts
}