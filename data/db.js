const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alessandro9=',
    database: 'movies_db'
})

connection.connect((err) => {
    if(err) throw err
    console.log('Connesso a MySQL')
})

module.exports = connection