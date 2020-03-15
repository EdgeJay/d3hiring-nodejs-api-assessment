import { Next } from 'koa';
import Database from '../core/Database';
import { ExtendedContext } from '../types/koaExtended';

export const register = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const db = Database.getInstance().client;

  if (db) {
    const result = await db('teacher').select();
    console.log(result);
  }

  ctx.json({ statusCode: 204 });
  await next();
};
