import findConfig from 'find-config';
import dotenv from 'dotenv';

const DEFAULT_PATH = findConfig('.env');

export function initDotEnv(dotenvPath = DEFAULT_PATH) {
  const { error, parsed } = dotenv.config({
    path: dotenvPath,
  });

  // do not proceed as app cannot function properly
  // useable dotenv values.
  if (error) {
    throw error;
  }

  return parsed;
}

export function getDatabaseConfig({
  DB_CLIENT: client,
  DB_HOST: host,
  DB_USER: user,
  DB_PASS: password,
  DB_NAME: database,
}) {
  return {
    client,
    host,
    user,
    password,
    database,
  };
}
