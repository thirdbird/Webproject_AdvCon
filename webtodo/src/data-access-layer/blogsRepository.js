const db = require('./db')

module.exports = function ({ }) {

    return {
        getAllBlogPosts: function (callback) {
            const query = `SELECT * FROM blogposts`
            const values = []
            db.query(query, values, function (error, blogPosts) {
                if (error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], blogPosts)
                }
            })
        },

        getBlogPostById: function (blogPost, callback) {
            const query = `SELECT * FROM blogposts WHERE id  = ?  LIMIT 1`
            const values = [blogPost.id]

            db.query(query, values, function (error, blogPosts) {
                if (error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], blogPosts[0])
                }
            })
        },

        createBlogPost: function (blogPost, accountUser, callback) {
            const query = `INSERT INTO blogposts (title, post, account_user) VALUES (?, ?, ?)`
            const values = [blogPost.title, blogPost.post, accountUser]

            db.query(query, values, function (error, results) {
                if (error) {
                    // TODO: Look for usernameUnique violation.
                    callback(['databaseError'], null)
                } else {
                    callback([], results.insertId)
                }
            })
        }
    }
}