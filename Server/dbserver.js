const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: {
    rejectUnauthorized: true
  }
});

// Test connection
pool.getConnection((err, conn) => {
  if(err) {
    console.log("DB Connection Error:", err.message);
  } else {
    console.log("✅ DB Connected - Pool ready");
    conn.release();
  }
});

module.exports = pool;