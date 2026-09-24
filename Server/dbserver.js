const mysql = require('mysql2');
require('dotenv').config();

const isLocalhost = process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || (isLocalhost ? 3306 : 4000),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(isLocalhost ? {} : {
    ssl: { rejectUnauthorized: false }
  })
});

pool.getConnection((err, conn) => {
  if(err) {
    console.log("❌ DB Error:", err.message);
  } else { 
    console.log(`✅ DB Connected - ${isLocalhost ? 'localhost' : 'cloud'}`); 
    conn.release(); 
  }
});

module.exports = pool; // <-- FIXED, no .promise()