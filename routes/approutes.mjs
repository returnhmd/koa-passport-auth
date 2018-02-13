import Router from 'koa-router';

const router = new Router();

router.get('/', async ctx => {
  await ctx.render('main.pug');
});

router.get(
  '/home',
  async (ctx, next) => {
    console.log('middleware');
    if (ctx.isUnauthenticated()) {
      ctx.throw(403, 'Bad boy');
    }
    await next();
  },
  async ctx => {
    await ctx.render('home.pug', {
      title: 'home',
      username: ctx.state.user.username,
    });
  },
);

router.get('/logout', async ctx => {
  ctx.logout();
  ctx.redirect('/');
});

export default router.routes();
