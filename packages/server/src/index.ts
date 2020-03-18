import Koa from 'koa';
import { initDotEnv, getNodePort, getDatabaseConfig } from './core/env';
import Database from './core/Database';
import { initLogger } from './core/logger';
import { initRoutes } from './core/routes';

async function start(): Promise<void> {
  // create new Koa instance that will be serving endpoints from this app
  const app = new Koa();

  // init logging
  initLogger(app);

  // fetch and setup dotenv vars
  const env = initDotEnv();

  if (env) {
    /**
     * env variables are deliberately passed into subsequent function calls
     * to prevent direct references to process.env in functions, which can
     * make testing difficult. It also makes parts of codebase tightly coupled
     * with process.env.
     */
    Database.getInstance().init(getDatabaseConfig(env));

    initRoutes(app);

    const port = getNodePort(env);
    app.listen(port, (): void => {
      // eslint-disable-next-line
      console.log(`Server started listening at port ${port}`);
    });
  } else {
    throw new Error('Missing dotenv configuration');
  }
}

start();
