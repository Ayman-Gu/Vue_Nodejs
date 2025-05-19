const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'nodejs_vuejs_crud',
});

connection.connect((err) => {
if (err) throw err;
console.log('Connected to MySQL!');
});

module.exports = connection;