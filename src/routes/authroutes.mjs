import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

router.get('/twitter', passport.authenticate('twitter'));
router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

export default router.routes();
