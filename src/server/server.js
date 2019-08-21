const Koa = require('koa');

const app = new Koa();

const devMode = process.env.NODE_ENV !== 'production'

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
