import Router from 'koa-router';

import { withAuth } from '../middlewares';

const router = new Router();

router.get('/', async ctx => {
  await ctx.render('main.pug');
});

router.get('/home', withAuth(), async ctx => {
  await ctx.render('home.pug', {
    title: 'home',
    username: ctx.state.user.username,
    photoUrl: ctx.state.user.photoUrl,
  });
});

router.get('/logout', async ctx => {
  ctx.logout();
  ctx.redirect('/');
});

export default router.routes();
