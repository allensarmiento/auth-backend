const knex = require('knex');
const { PostgresURI } = require('./config');

const db = knex({
  client: 'pg',
  connection: PostgresURI,
});

module.exports = db;
