const Sequelize = require('sequelize')
const db = require('./db')

const Accounts = db.define('accounts', {
    username: {
        type: Sequelize.TEXT,
        unique: true},
    password: {type: Sequelize.TEXT},
    //usernameUnique: {unique: 'username'}
})

module.exports = Accounts

