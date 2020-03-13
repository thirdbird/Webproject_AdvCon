
const Sequelize = require('sequelize')

const sequelize = new Sequelize('myDB2', 'root', 'abc123', {
    database: "myDB2",
    host: 'db2',
    dialect: 'mysql',
});


function makeConnectionBeforeSync(sequelizeObject, boolIsConnected) {
    if (!boolIsConnected) {
        setTimeout(function () {
            sequelizeObject.authenticate()
                .then(() => {
                    sequelizeObject.sync()
                    console.log("Database connected...")
                    return
                })
                .catch(err => {
                    makeConnectionBeforeSync(sequelizeObject, false)
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@", err)
                })
        }, 4000)
    }
}

makeConnectionBeforeSync(sequelize, false)

module.exports = sequelize
