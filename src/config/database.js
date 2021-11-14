const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.12',
  database: 'postgres',
  password: 'Abc12345',
  port: 5432,
})

module.exports = pool;