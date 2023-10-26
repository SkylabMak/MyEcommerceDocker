console.log("this is SQL");
const mysql = require('mysql2/promise');

var host = "localhost";
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV == 'production'){
  host = 'projectOSDB';
}

// Create a connection pool
const pool = mysql.createPool({
  host: host,  // This would be the IP or domain of your MySQL container
  user: 'root',
  password: '1234',
  database: 'OS',
  port:3306,
});

module.exports = pool;