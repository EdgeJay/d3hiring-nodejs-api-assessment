import { Next } from 'koa';
import { ExtendedContext } from '../../types/koaExtended';

const retrieveForNotifications = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  await next();
};

export default retrieveForNotifications;
