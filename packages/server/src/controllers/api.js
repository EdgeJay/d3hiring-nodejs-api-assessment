import Database from '../core/Database.js';

export const register = async (ctx, next) => {
  const db = Database.getInstance().client;

  const result = await db('teacher').select();
  console.log(result);

  ctx.json({ statusCode: 204 });
  await next();
};
