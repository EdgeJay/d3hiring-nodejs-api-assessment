import knex from 'knex';

export default class Database {
  static _instance;

  static getInstance() {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }

  /**
   * Initialise and return database client
   * @param {object} param0 Database config
   */
  init({ client, host, user, password, database }) {
    this._client = knex({
      client,
      connection: {
        host,
        user,
        password,
        database,
      },
    });
    return this._client;
  }

  get client() {
    return this._client;
  }
}
