const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Blogs = db.define('blogs', {
        title: Sequelize.TEXT,
        post: Sequelize.TEXT,
        account_user: Sequelize.TEXT
    })

    Blogs.associate = (models) => {
        Blogs.belongsTo(models.Accounts, { as: "accounts", foreignKey: "account_user" })
    }
    
    return Blogs
}