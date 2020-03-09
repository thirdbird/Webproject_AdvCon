const Sequelize = require('sequelize')
const db = require('./db')

module.exports = function ({ }) {
    const Blogs = db.define('blogs', {
        title: Sequelize.TEXT,
        post: Sequelize.TEXT
    })

    return Blogs
}