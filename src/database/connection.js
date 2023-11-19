const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    username: 'sqlserver',
    password: 'Dbserver1',
    database: 'gatsbyFrontEnd',
    host: 'gatsby.database.windows.net',
    dialect: 'mssql',
    driver: 'tedious',
    port: 1433,
    define: {        
        freezeTableName: true
    }
})

try {
    sequelize.authenticate()
    console.log('Connection Succefully')    
}
catch(err) {
    console.log('Connection error')
}

module.exports = sequelize
