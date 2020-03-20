import { Next } from 'koa';
import uuid from 'uuid';
import { ExtendedContext } from '../types/koaExtended';

export default async (ctx: ExtendedContext, next: Next): Promise<void> => {
  ctx.state = {
    transactionId: uuid.v4(),
  };
  await next();
};
