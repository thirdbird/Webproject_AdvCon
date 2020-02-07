const mysql = require("mysql")

const dbConnection = mysql.createConnection({
	host: "db",
	user: "root",
	password: "abc123",
	database: "myDB"
})

module.exports = dbConnection