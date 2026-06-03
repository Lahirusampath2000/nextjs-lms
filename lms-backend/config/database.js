const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// REAL connection test
pool.connect()
  .then((client) => {
    console.log("✅ PostgreSQL Connected Successfully");
    client.release(); // very important
  })
  .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed:", err.message);
  });

module.exports = pool;