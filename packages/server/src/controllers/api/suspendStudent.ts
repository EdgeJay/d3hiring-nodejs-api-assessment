import { Next } from 'koa';
import { ExtendedContext } from '../../types/koaExtended';

const suspendStudent = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  await next();
};

export default suspendStudent;
