const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || null;
let pool = null;
if (connectionString) {
  pool = new Pool({ connectionString });
}

module.exports = { pool };
