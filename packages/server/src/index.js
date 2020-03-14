import { initDotEnv, getDatabaseConfig } from './core/env.js';
import { initDatabase } from './core/database.js';

const env = initDotEnv();

/**
 * env variables are deliberately passed into subsequent function calls
 * to prevent direct references to process.env in functions, which can
 * make testing difficult. It also makes parts of codebase tightly coupled
 * with process.env.
 */

const db = initDatabase(getDatabaseConfig(env));

async function test() {
  const result = await db('teacher').select();
  console.log(result[0].id, result[0].name);
  // db.destroy();
}

test();
