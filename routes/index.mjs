import Router from 'koa-router';

import appRoutes from './approutes.mjs';
import authRoutes from './authroutes.mjs';

const router = new Router();

router.use('/auth', authRoutes);

router.use(appRoutes);

export default router;
