const Pool = require('pg').Pool;
require('dotenv').config()

const db   = new Pool({
  user      : process.env.PG_DBUSER,
  host      : process.env.PG_DBHOST,
  database  : process.env.PG_DBNAME,
  password  : process.env.PG_DBPASSWORD,
  port      : process.env.PG_DBPORT,
});

module.exports = db;