import Knex from 'knex';
import objection from 'objection';

// Deliberately written in this manner as
// ESM implementation in Node.js does not support
// named imports yet.
const { knexSnakeCaseMappers, Model } = objection;

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
      ...knexSnakeCaseMappers(),
    });

    // Provide Knex instance to ORM library "objection",
    // once this is added it will be available to all models.
    Model.knex(this._client);

    return this._client;
  }

  get client(): Knex | undefined {
    return this._client;
  }
}
