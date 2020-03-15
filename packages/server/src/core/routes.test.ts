import test from 'ava';
import { Next } from 'koa';
import sinon from 'sinon';
import { jsonResponseHelper } from './routes';
import { ExtendedContext } from '../types/koaExtended';

function createNextFunc(): Next {
  return (): Promise<void> => Promise.resolve();
}

test('jsonResponseHelper should add json() method to ctx', async t => {
  const middleware = jsonResponseHelper();
  const next = sinon.spy(createNextFunc());
  const koaContext = {} as ExtendedContext;

  await middleware(koaContext, next);

  t.true(typeof koaContext.json === 'function');
  t.true(next.called);
});

test('json() method should allow setting of status code', async t => {
  const middleware = jsonResponseHelper();
  const next = createNextFunc();
  const koaContext = {} as ExtendedContext;

  await middleware(koaContext, next);

  koaContext.json({ statusCode: 400 });

  t.is(koaContext.status, 400);
});

test('json() method should always set response type as "application/json;charset=utf-8"', async t => {
  const middleware = jsonResponseHelper();
  const next = createNextFunc();
  const koaContext = {} as ExtendedContext;

  await middleware(koaContext, next);

  koaContext.json({ statusCode: 400 });

  t.is(koaContext.type, 'application/json;charset=utf-8');
});

test('json() method should not set body if status code is 204 or 205', async t => {
  const middleware = jsonResponseHelper();
  const next = createNextFunc();
  const koaContext = {} as ExtendedContext;

  await middleware(koaContext, next);

  koaContext.json({ body: { foo: 'bar' }, statusCode: 204 });

  t.is(koaContext.type, 'application/json;charset=utf-8');
  t.is(koaContext.status, 204);
  t.is(koaContext.body, undefined);

  koaContext.json({ body: { foo: 'bar' }, statusCode: 205 });

  t.is(koaContext.type, 'application/json;charset=utf-8');
  t.is(koaContext.status, 205);
  t.is(koaContext.body, undefined);
});

test('json() method should default status to 200 if not specified', async t => {
  const middleware = jsonResponseHelper();
  const next = createNextFunc();
  const koaContext = {} as ExtendedContext;

  await middleware(koaContext, next);

  koaContext.json({ body: { foo: 'bar' } });

  t.is(koaContext.type, 'application/json;charset=utf-8');
  t.is(koaContext.status, 200);
  t.deepEqual(koaContext.body, { foo: 'bar' });
});
