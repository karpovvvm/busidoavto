const Pool = require('pg-pool');
// const types = require('pg').types;
// types.setTypeParser(types.builtins.DATE, (val) => val)

const config = {
  user:                    process.env.DB_USER,
  password:                process.env.DB_PASSWORD,
  host:                    process.env.DB_HOST,
  port:                    process.env.DB_PORT,
  database:                process.env.DB_NAME,
  ssl:                     process.env.DB_SSL === 'true',
  connectionTimeoutMillis: 10000,
  max:                     15,
};

const pool = new Pool(config);

pool.on('error', (error, client) => {
  console.error(error);
  process.exit(-1);
});

pool.on('connect', client => {
  console.log('New client');
});

pool.on('remove', client => {
  console.log('Client pool removed');
});

module.exports = {
  pool: pool,
};
