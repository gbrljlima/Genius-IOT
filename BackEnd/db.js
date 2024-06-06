const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'srv691.hstgr.io',
  user: 'u817008098_maicon',
  password: 'Nn0iBq$4K!',
  database: 'u817008098_maicon'
}).promise();

 // Enable promise-based queries

module.exports = pool;