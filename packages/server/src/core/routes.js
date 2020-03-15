import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { register } from '../controllers/api.js';

/**
 * This function will provide router that handles /api/* requests
 * Add api routes here
 */
function initApiRoutes() {
  const apiRouter = new Router();

  apiRouter.post('/register', register);

  return apiRouter;
}

/**
 * Use this function to json response helper to Koa context object
 * passed into each request calls.
 */
export function jsonResponseHelper() {
  // adds json response helper
  return async (ctx, next) => {
    ctx.json = ({ body, statusCode = 200 } = {}) => {
      if (statusCode !== 204 || statusCode !== 205) {
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
export function initRoutes(app) {
  // bodyParser helps to parse request body and store it under ctx.request.body
  app.use(bodyParser());

  app.use(jsonResponseHelper());

  const router = new Router();
  const apiRouter = initApiRoutes();

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

  app.use(router.routes());
}
