const Koa = require('koa');
const send = require('koa-send');
const path = require('path');

const pageRouter = require('./routers/dev-ssr');

const app = new Koa();

const devMode = process.env.NODE_ENV !== 'production';

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    if (devMode) {
      ctx.body = err.message;
    } else {
      ctx.body = 'Please try again later!';
    }
  }
});

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../../')});
  } else {
    await next();
  }
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
});
