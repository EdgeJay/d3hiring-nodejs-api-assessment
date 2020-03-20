const dotenvPath = require('find-config')('.env');

require('dotenv').config({
  path: dotenvPath,
});

const { DB_CLIENT: client } = process.env;

const DEFAULT_MIGRATION_TABLE = 'knex_migrations';
const DEFAULT_MIGRATION_STUB = 'migration.stub.js';

const getDbConfig = () => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const getConfigForEnvironment = () => ({
  client,
  connection: getDbConfig(),
  migrations: {
    tableName: DEFAULT_MIGRATION_TABLE,
    stub: DEFAULT_MIGRATION_STUB,
  },
});

module.exports = {
  development: {
    ...getConfigForEnvironment(),
  },
  production: {
    ...getConfigForEnvironment(),
  },
};
