import Router from 'koa-router';

import appRoutes from './approutes';
import authRoutes from './authroutes';

const router = new Router();

router.use('/auth', authRoutes);
router.use(appRoutes);

export default router;
