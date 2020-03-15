import Knex from 'knex';

export default class Database {
  static _instance: Database;

  static getInstance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }

  private _client?: Knex;

  constructor() {
    this._client = undefined;
  }

  /**
   * Initialise and return database client
   * @param {object} param0 Database config
   */
  init({ client, host, user, password, database }: DatabaseConfig): Knex | undefined {
    this._client = Knex({
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

  get client(): Knex | undefined {
    return this._client;
  }
}
