import Koa from 'koa';
import { initDotEnv, getNodePort, getDatabaseConfig } from './core/env.js';
import Database from './core/Database.js';
import { initRoutes } from './core/routes.js';

async function start() {
  // create new Koa instance that will be serving endpoints from this app
  const app = new Koa();

  // fetch and setup dotenv vars
  const env = initDotEnv();

  /**
   * env variables are deliberately passed into subsequent function calls
   * to prevent direct references to process.env in functions, which can
   * make testing difficult. It also makes parts of codebase tightly coupled
   * with process.env.
   */
  Database.getInstance().init(getDatabaseConfig(env));

  initRoutes(app);

  app.listen(getNodePort(env));
}

start();
