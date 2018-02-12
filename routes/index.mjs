import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/',
  }),
);

router.get('/', async ctx => {
  await ctx.render('main');
});

router.get(
  '/app',
  async (ctx, next) => {
    console.log('middleware');
    if (ctx.isUnauthenticated()) {
      ctx.throw(403, 'You bastard!');
    }
    await next();
  },
  async ctx => {
    await ctx.render('app');
  },
);

router.get('/logout', async ctx => {
  ctx.logout();
  ctx.redirect('/');
});

export default router;
