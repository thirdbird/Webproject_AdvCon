const Sequelize = require('sequelize')

const sequelize = new Sequelize('myDB2', 'root', 'abc123', {
    database: "myDB2",
    host: 'db2',
    dialect: 'mysql',
});

module.exports = sequelize
