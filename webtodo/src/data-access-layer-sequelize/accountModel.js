const Sequelize = require('sequelize')
const db = require('./db')

const Accounts = db.define('accounts',{
    username: Sequelize.TEXT,
    password: Sequelize.TEXT
})

//Accounts.create({username: "Bob",password: "abc123"}) 

module.exports = Accounts