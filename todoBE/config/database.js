const mysql = require('mysql2/promise'); 

const config = {
    user: "root",
    password: "Sampada@05",
    host: "127.0.0.1",
    port: "3306",
    database: "todo",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

const pool = mysql.createPool(config)


module.exports = {
    pool
}

