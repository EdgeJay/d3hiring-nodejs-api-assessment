import knex from 'knex';

/**
 * Initialise and return database client
 * @param {object} param0 Database config
 */
export function initDatabase({ client, host, user, password, database }) {
  const db = knex({
    client,
    connection: {
      host,
      user,
      password,
      database,
    },
  });
  return db;
}
