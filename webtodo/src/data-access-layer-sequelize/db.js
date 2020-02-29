const mysql = require("mysql")

const dbConnection = mysql.createConnection({
	host: "db2",
	user: "root",
	password: "abc123",
	database: "myDB2"
})

module.exports = dbConnection