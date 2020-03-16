import { Next } from 'koa';
import { ExtendedContext } from '../types/koaExtended';
import ApiError from '../errors/ApiError';

export default async (ctx: ExtendedContext, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ApiError) {
      const apiError = err as ApiError;
      ctx.status = apiError.statusCode;
    } else {
    }
  }
};
