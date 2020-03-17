import Koa, { Next } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { register, commonStudents } from '../controllers/api';
import errorCatcher from '../middlewares/errorCatcher';
import { ExtendedContext, ExtendedMiddleware } from '../types/koaExtended';

/**
 * This function will provide router that handles /api/* requests
 * Add api routes here
 */
function initApiRoutes(): Router<{}, ExtendedMiddleware> {
  const apiRouter = new Router<{}, ExtendedMiddleware>();

  apiRouter.use(errorCatcher);
  apiRouter.post('/register', register);
  apiRouter.get('/commonstudents', commonStudents);

  return apiRouter;
}

/**
 * Use this function to json response helper to Koa context object
 * passed into each request calls.
 */
export function jsonResponseHelper() {
  // adds json response helper
  return async (ctx: ExtendedContext, next: Next): Promise<void> => {
    ctx.json = ({ body, statusCode = 200 } = {}): void => {
      if (!(statusCode === 204 || statusCode === 205)) {
        ctx.body = body;
      }
      ctx.type = 'application/json;charset=utf-8';
      ctx.status = statusCode;
    };

    await next();
  };
}

/**
 * Use this function to add routes to Koa app
 *
 * @param {object} app Koa app instance
 */
export function initRoutes(app: Koa): void {
  // bodyParser helps to parse request body and store it under ctx.request.body
  app.use(bodyParser());

  app.use(jsonResponseHelper());

  const router = new Router<{}, ExtendedMiddleware>();
  const apiRouter = initApiRoutes();

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

  app.use(router.routes());
}
